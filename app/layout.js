import './globals.css'
import Header from '@/components/Header/Header'
import { Providers } from './providers'
import { AuthProviderWrapper } from '@/contexts/auth.context'
import { HeaderProviderWrapper } from '@/contexts/header.context '

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Talking 🤐</title>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>
        <Providers>
          <AuthProviderWrapper>
            <HeaderProviderWrapper>
              <Header />
              {children}
            </HeaderProviderWrapper>
          </AuthProviderWrapper>
        </Providers>
      </body>
    </html>
  )
}
