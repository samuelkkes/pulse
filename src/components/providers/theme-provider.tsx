'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import {ReactNode} from "react";

const ThemeProvider = ({ children }: {children: ReactNode}) => {
  return (
      <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="pulse-theme"
      >
        {children}
      </NextThemeProvider>
  )
}

export { ThemeProvider }
