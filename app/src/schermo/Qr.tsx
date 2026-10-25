import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export function Qr({ testo, lato = 320 }: { testo: string; lato?: number }) {
  const [src, setSrc] = useState<string | null>(null)
  useEffect(() => {
    let vivo = true
    QRCode.toDataURL(testo, { width: lato * 2, margin: 1, color: { dark: '#1e2939', light: '#ffffff' } })
      .then((url) => vivo && setSrc(url))
      .catch(() => vivo && setSrc(null))
    return () => {
      vivo = false
    }
  }, [testo, lato])
  return src ? <img src={src} width={lato} height={lato} alt="" /> : null
}
