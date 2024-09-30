'use client'

import { ThemeProvider } from './theme-provider'
import {ReactNode} from "react";
import AuthProvider from "@/components/providers/auth-provider";

export function Providers({ children }: { children: ReactNode }) {

  return (
      <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
  )
}
