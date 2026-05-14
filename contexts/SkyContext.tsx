'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type Mode = 'day' | 'sunset'

interface SkyState {
  mode: Mode
  enabled: boolean
  setMode: (m: Mode) => void
  setEnabled: (e: boolean) => void
}

const SkyContext = createContext<SkyState>({
  mode: 'day',
  enabled: false,
  setMode: () => {},
  setEnabled: () => {},
})

export function SkyProvider({ children }: { children: ReactNode }) {
  const [mode, setMode]       = useState<Mode>('day')
  const [enabled, setEnabled] = useState(false)

  return (
    <SkyContext.Provider value={{ mode, enabled, setMode, setEnabled }}>
      {children}
    </SkyContext.Provider>
  )
}

export const useSky = () => useContext(SkyContext)
