'use client'

import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function QRScanner() {
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }, [])

  const handleScan = (decodedText: string) => {
    setResult(decodedText)
    setIsScanning(false)
    if (scannerRef.current) {
      scannerRef.current.stop()
    }
    // TODO: Send the scanned data to your API to join the queue
  }

  const handleError = (err: string) => {
    console.error(err)
    setError('Failed to access camera. Please make sure you have given permission.')
    setIsScanning(false)
  }

  const startScanning = () => {
    setIsScanning(true)
    setResult('')
    setError('')

    const config = { fps: 10, qrbox: { width: 250, height: 250 } }
    
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        const scanner = new Html5Qrcode('reader')
        scannerRef.current = scanner
        scanner.start(
          { facingMode: 'environment' },
          config,
          handleScan,
          handleError
        )
      }
    }).catch(err => {
      handleError('Error getting cameras: ' + err)
    })
  }

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false)
      }).catch((err) => {
        console.error('Error stopping scanner:', err)
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escanea el código QR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          {isScanning ? (
            <div id="reader" className="w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Button onClick={startScanning}>Escanear</Button>
            </div>
          )}
        </div>
        {isScanning && (
          <Button onClick={stopScanning} className="mt-4 w-full">Stop Scanning</Button>
        )}
        {result && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg flex items-center">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-600 dark:text-green-400">Successfully scanned: {result}</p>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded-lg flex items-center">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}