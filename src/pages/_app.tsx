'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecipesProvider } from '@/providers/RecipesProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecipesProvider>
      <Component {...pageProps} />
    </RecipesProvider>
  )
}
