-- Advisor 0011: search_path fisso anche per ora_server().
alter function public.ora_server() set search_path = '';
