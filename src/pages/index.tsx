import Head from 'next/head'
import { Box } from '@mui/material'
import { MainHeader } from '@/components/layouts/MainHeader'
import { Sidebar } from '@/components/layouts/Sidebar'
import { MainContent } from '@/components/layouts/MainContent'
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
      <main className="">
        <Box>
          <MainHeader />
          <MainLayout>
            <Sidebar />
            <MainContent />
          </MainLayout>
        </Box>
      </main>
    </>
  )
}
