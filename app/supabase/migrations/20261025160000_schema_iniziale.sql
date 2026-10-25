-- Questionario festa: schema, RLS e RPC (ticket 10 Architettura della SPA, 11 Base della SPA).
-- Il DB conosce solo gli id delle domande (1-12): testi, opzioni e valori stanno in app/src/contenuti/domande.ts.
-- Nessuna tabella contiene IP, user agent o dati nominativi.

-- Utenti Regia (Supabase Auth). Solo chi è qui può scrivere serate e stato.
create table public.regia (
  user_id uuid primary key
);
alter table public.regia enable row level security;

create or replace function public.e_regia()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.regia where user_id = auth.uid());
$$;

create table public.serate (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  reale boolean not null default false,
  attiva boolean not null default false,
  creata_il timestamptz not null default now()
);
create unique index serate_una_attiva on public.serate (attiva) where attiva;
create unique index serate_una_reale on public.serate (reale) where reale;
alter table public.serate enable row level security;

create table public.stato (
  serata_id uuid primary key references public.serate (id) on delete cascade,
  domanda smallint check (domanda between 1 and 12),
  fase text not null default 'accoglienza' check (fase in (
    'accoglienza', 'voto', 'distribuzione', 'indovina', 'stima', 'realta',
    'scomposizione', 'premio', 'fine'
  )),
  scade_alle timestamptz,
  aggiornato_il timestamptz not null default now()
);
alter table public.stato enable row level security;

create table public.collegati (
  serata_id uuid not null references public.serate (id) on delete cascade,
  token uuid not null,
  creato_il timestamptz not null default now(),
  primary key (serata_id, token)
);
alter table public.collegati enable row level security;

create table public.voti (
  serata_id uuid not null references public.serate (id) on delete cascade,
  domanda smallint not null check (domanda between 1 and 12),
  token uuid not null,
  opzioni smallint[] not null check (cardinality(opzioni) between 1 and 2),
  creato_il timestamptz not null default now(),
  primary key (serata_id, domanda, token)
);
alter table public.voti enable row level security;

-- Lettura: la serata attiva e il suo stato per tutti; tutto per la Regia.
create policy serate_lettura on public.serate for select to anon, authenticated
  using (attiva or public.e_regia());
create policy stato_lettura on public.stato for select to anon, authenticated
  using (public.e_regia() or exists (
    select 1 from public.serate s where s.id = serata_id and s.attiva
  ));
-- collegati e voti: nessuna policy, accesso solo via RPC.

revoke all on public.regia, public.serate, public.stato, public.collegati, public.voti from anon, authenticated;
grant select on public.serate, public.stato to anon, authenticated;

-- Postgres Changes sulla riga stato.
alter publication supabase_realtime add table public.stato;

-- Ora del server, per allineare i countdown dei client.
create or replace function public.ora_server()
returns timestamptz
language sql stable
as $$ select now(); $$;

-- Telefono: registra il Collegato (idempotente) e restituisce le domande già votate.
create or replace function public.collega(p_token uuid)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_serata uuid;
begin
  select id into v_serata from public.serate where attiva;
  if v_serata is null then
    return jsonb_build_object('serata_id', null, 'votate', '[]'::jsonb);
  end if;
  insert into public.collegati (serata_id, token) values (v_serata, p_token)
    on conflict do nothing;
  return jsonb_build_object(
    'serata_id', v_serata,
    'votate', coalesce((
      select jsonb_agg(domanda order by domanda) from public.voti
      where serata_id = v_serata and token = p_token
    ), '[]'::jsonb)
  );
end;
$$;

-- Telefono: voto sulla domanda corrente, in fase di voto, entro scade_alle + 1 s.
-- Esito: 'ok' | 'gia_votato' | 'chiuso' | 'non_valido'.
create or replace function public.vota(p_token uuid, p_domanda smallint, p_opzioni smallint[])
returns text
language plpgsql security definer set search_path = ''
as $$
declare
  v_stato public.stato;
  v_max int := case when p_domanda = 11 then 2 else 1 end;
begin
  select st.* into v_stato from public.stato st
    join public.serate s on s.id = st.serata_id
    where s.attiva;
  if v_stato.serata_id is null
     or v_stato.domanda is distinct from p_domanda
     or v_stato.fase <> 'voto'
     or v_stato.scade_alle is null
     or now() > v_stato.scade_alle + interval '1 second' then
    return 'chiuso';
  end if;
  if p_opzioni is null
     or cardinality(p_opzioni) not between 1 and v_max
     or (select count(distinct o) from unnest(p_opzioni) o) <> cardinality(p_opzioni)
     or exists (select 1 from unnest(p_opzioni) o where o is null or o not between 0 and 9) then
    return 'non_valido';
  end if;
  insert into public.collegati (serata_id, token) values (v_stato.serata_id, p_token)
    on conflict do nothing;
  insert into public.voti (serata_id, domanda, token, opzioni)
    values (v_stato.serata_id, p_domanda, p_token, p_opzioni)
    on conflict do nothing;
  if not found then
    return 'gia_votato';
  end if;
  return 'ok';
end;
$$;

-- Schermo e Regia: Collegati, votanti e distribuzione per domanda della serata attiva.
-- Gli stessi dati che vengono proiettati: nessun token esce da qui.
create or replace function public.conteggi()
returns jsonb
language sql stable security definer set search_path = ''
as $$
  with s as (select id from public.serate where attiva),
  per_opzione as (
    select v.domanda, o as opzione, count(*) as n
    from public.voti v, unnest(v.opzioni) o
    where v.serata_id = (select id from s)
    group by v.domanda, o
  ),
  per_domanda as (
    select v.domanda, count(*) as votanti
    from public.voti v
    where v.serata_id = (select id from s)
    group by v.domanda
  )
  select jsonb_build_object(
    'serata_id', (select id from s),
    'collegati', (select count(*) from public.collegati where serata_id = (select id from s)),
    'domande', coalesce((
      select jsonb_object_agg(d.domanda, jsonb_build_object(
        'votanti', d.votanti,
        'distribuzione', (
          select jsonb_object_agg(p.opzione, p.n) from per_opzione p where p.domanda = d.domanda
        )
      ))
      from per_domanda d
    ), '{}'::jsonb)
  );
$$;

-- Regia: nuova serata (prova o reale), che diventa l'unica attiva, con stato in accoglienza.
create or replace function public.nuova_serata(p_nome text, p_reale boolean default false)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  v_id uuid;
begin
  if not public.e_regia() then
    raise exception 'solo la Regia' using errcode = '42501';
  end if;
  update public.serate set attiva = false where attiva;
  if p_reale then
    update public.serate set reale = false where reale;
  end if;
  insert into public.serate (nome, reale, attiva) values (p_nome, p_reale, true)
    returning id into v_id;
  insert into public.stato (serata_id) values (v_id);
  return v_id;
end;
$$;

-- Regia: rende attiva una serata esistente (es. tornare alla serata reale dopo una prova).
create or replace function public.attiva_serata(p_serata uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.e_regia() then
    raise exception 'solo la Regia' using errcode = '42501';
  end if;
  update public.serate set attiva = false where attiva and id <> p_serata;
  update public.serate set attiva = true where id = p_serata;
end;
$$;

-- Regia: porta la serata attiva su domanda e fase. Con p_durata (secondi) apre il voto
-- calcolando scade_alle sull'ora del server.
create or replace function public.imposta_stato(p_domanda smallint, p_fase text, p_durata int default null)
returns public.stato
language plpgsql security definer set search_path = ''
as $$
declare
  v_stato public.stato;
begin
  if not public.e_regia() then
    raise exception 'solo la Regia' using errcode = '42501';
  end if;
  update public.stato st set
    domanda = p_domanda,
    fase = p_fase,
    scade_alle = case when p_durata is null then null else now() + make_interval(secs => p_durata) end,
    aggiornato_il = now()
  from public.serate s
  where s.id = st.serata_id and s.attiva
  returning st.* into v_stato;
  return v_stato;
end;
$$;

-- Regia: sposta la scadenza del voto. p_secondi > 0 proroga ("+10 s", riapre se già scaduto);
-- null chiude subito.
create or replace function public.sposta_scadenza(p_secondi int default null)
returns public.stato
language plpgsql security definer set search_path = ''
as $$
declare
  v_stato public.stato;
begin
  if not public.e_regia() then
    raise exception 'solo la Regia' using errcode = '42501';
  end if;
  update public.stato st set
    scade_alle = case
      when p_secondi is null then least(st.scade_alle, now())
      else greatest(st.scade_alle, now()) + make_interval(secs => p_secondi)
    end,
    aggiornato_il = now()
  from public.serate s
  where s.id = st.serata_id and s.attiva and st.fase = 'voto'
  returning st.* into v_stato;
  return v_stato;
end;
$$;

revoke execute on all functions in schema public from public, anon, authenticated;
-- e_regia() serve anche ad anon, perché le policy di lettura la valutano (per anon è false).
grant execute on function public.e_regia(), public.ora_server(), public.collega(uuid),
  public.vota(uuid, smallint, smallint[]), public.conteggi() to anon, authenticated;
grant execute on function public.nuova_serata(text, boolean),
  public.attiva_serata(uuid), public.imposta_stato(smallint, text, int),
  public.sposta_scadenza(int) to authenticated;
