import { ChangeEvent, useState } from 'react'
import './App.css'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import QRCode from 'react-qr-code'
import QRCodeGen from 'qrcode'


function App() {
  const [link, setLink] = useState('')
  const [qrcodeLink, setQrcodeLink] = useState('')

  function handleQrcodeGenerate(url: string) {
    QRCodeGen.toDataURL(url, {
      width: 400,
      margin: 3
    }, (_, url) => {
      if (url) {
        setQrcodeLink(url)
      }
    })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    setLink(value)

    if (value !== '') {
      handleQrcodeGenerate(value)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-slate-900 
      w-screen h-screen px-10 py-10 sm:px-[30%] gap-20'
    >
      <h1 className='text-center text-slate-200 text-3xl md:text-6xl sm:text-5xl'>Gerador de QR code</h1>

      <div className="flex flex-col w-full gap-4">
        <Label htmlFor='link' className='text-slate-200 text-xl'>
          Seu link
        </Label>
        <Input
          id='link'
          type='text'
          onChange={handleChange}
          placeholder='Link'
          className='bg-transparent text-slate-200'
        />
        <div className='flex flex-col items-center w-full space-y-5 pt-4'>


          <QRCode
            value={link}
            className={`${link !== '' ? 'flex' : 'hidden'}`}
          />

          <Button
            variant={'secondary'}
            className={`${link !== '' ? 'flex' : 'hidden'}`}
            asChild
          >
            <a href={qrcodeLink} download='meu-qrcode.jpg'>Baixar QR code</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
