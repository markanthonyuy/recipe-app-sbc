import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { MainHeader } from '@/components/layouts/MainHeader'
import { Sidebar } from '@/components/layouts/Sidebar'
import { MainContent } from '@/components/layouts/MainContent'
import { useGetInitialRecipes } from '@/hooks/useGetInitialRecipes'

const MainLayout = styled('div')({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  flexDirection: 'row',
})

export default function Index() {
  const { recipes } = useGetInitialRecipes()

  return (
    <>
      <Head>
        <title>Recipe app</title>
        <meta name="description" content="Recipe app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <Container>
          <MainHeader />
          <MainLayout>
            <Sidebar />
            <MainContent recipes={recipes} />
          </MainLayout>
        </Container>
      </main>
    </>
  )
}
