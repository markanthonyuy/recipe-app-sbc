import Head from 'next/head'
import { Box } from '@mui/material'
import { MainHeader } from '@/components/layouts/MainHeader'
import { Sidebar } from '@/components/layouts/Sidebar'
import { MainContent } from '@/components/layouts/MainContent'
import { MainLayout } from '@/components/layouts/MainLayout'
import { useRecipes } from '@/providers/RecipesProvider'
import { createRecipes } from '@/mocks/Recipes'
import { useEffect } from 'react'
import { Recipe } from '@/types/Recipes'

export const getStaticProps = () => {
  const recipes = JSON.parse(JSON.stringify(createRecipes(5)))
  return { props: { recipes } }
}

export default function Index(
  props: ReturnType<typeof getStaticProps>['props']
) {
  const { handleSetRecipes } = useRecipes()

  useEffect(function init() {
    handleSetRecipes(props.recipes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
