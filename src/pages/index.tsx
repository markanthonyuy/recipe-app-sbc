import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MainHeader } from '@/components/layouts/MainHeader'
import { Sidebar } from '@/components/layouts/Sidebar'
import { MainContent } from '@/components/layouts/MainContent'
import { RecipesProvider } from '@/providers/RecipesProvider'
import { MainLayout } from '@/components/layouts/MainLayout'

export default function Index() {
  return (
    <>
      <Head>
        <title>Recipe app</title>
        <meta name="description" content="Recipe app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RecipesProvider>
          <Box>
            <MainHeader />
            <MainLayout>
              <Sidebar />
              <MainContent />
            </MainLayout>
          </Box>
        </RecipesProvider>
      </main>
    </>
  )
}
