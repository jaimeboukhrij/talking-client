'use client'
import { createContext, useState } from 'react'

const HeaderContext = createContext()

function HeaderProviderWrapper (props) {
  const [activate, setActivate] = useState('chats')
  return (
    <HeaderContext.Provider value={{ activate, setActivate }}>
      {props.children}
    </HeaderContext.Provider>
  )
}

export { HeaderContext, HeaderProviderWrapper }
