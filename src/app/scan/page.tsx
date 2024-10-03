import QRScanner from '../components/QRScanner'

export default function ScanPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Escanear código QR</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Escanea el código QR para unirte a la fila.
      </p>
      <QRScanner />
    </div>
  )
}