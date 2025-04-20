'use client'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecipesProvider } from '@/providers/RecipesProvider'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
