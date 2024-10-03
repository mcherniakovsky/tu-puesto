'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Download } from 'lucide-react'

export default function GenerateQRPage({ restaurantId }: { restaurantId: string }) {
  const [queueUrl, setQueueUrl] = useState('')


  useEffect(() => {
    generateQueueUrl()
  }, [restaurantId])

  const generateQueueUrl = () => {
    const url = `${window.location.origin}/join-queue/${restaurantId}`
    setQueueUrl(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(queueUrl).then(() => {
      alert('URL copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = `restaurant-1-qr.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>QR del día de hoy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <QRCodeSVG
            id="qr-code"
            value={queueUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Input
            value={queueUrl}
            readOnly
            className="flex-grow"
          />
          <Button onClick={copyToClipboard} size="icon" variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={downloadQRCode} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Descargar QR Code
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Comparte este QR con tus clientes o comparte el siguiente enlace.
        </p>
      </CardContent>
    </Card>
  )
}