import { BackButton } from '@/components/common/BackButton'
import { FileUpload } from '@/components/common/FileUpload'
import { Header } from '@/components/common/Header'
import { Toast } from '@/components/common/Toast'
import { FormTextField } from '@/components/forms/FormTextField'
import { FormButtonContainer } from '@/components/layouts/FormButtonContainer'
import { FormContainer } from '@/components/layouts/FormContainer'
import { FormMainContainer } from '@/components/layouts/FormMainContainer'
import { FormSidebarContainer } from '@/components/layouts/FormSidebarContainer'
import { MainLayout } from '@/components/layouts/MainLayout'
import { INTIAL_FORM_VALUE } from '@/constants/Form'
import { useRecipes } from '@/providers/RecipesProvider'
import { RecipeSchema } from '@/schema/RecipeSchema'
import { PreviewableFile } from '@/types/File'
import { Recipe } from '@/types/Recipes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

export default function EditRecipe() {
  const router = useRouter()
  const { handleSetRecipes, recipes } = useRecipes()
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [files, setFiles] = useState<PreviewableFile[]>()
  const selectedRecipe = useMemo(() => {
    return recipes?.find((recipe) => {
      return router.query.id === recipe.id
    })
  }, [recipes, router.query.id])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: PreviewableFile) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      ...selectedRecipe,
      dateCreated: new Date(selectedRecipe?.dateCreated || ''),
    },
  })

  const onSubmit = handleSubmit((newRecipe) => {
    if (!newRecipe) {
      throw Error('Invalid form value')
    }
    if (recipes?.length) {
      const newRecipes = recipes.map((recipe) => {
        return recipe.id !== router.query.id ? recipe : { ...newRecipe }
      })
      handleSetRecipes(newRecipes)
    }
    setIsOpenToast(true)
    setTimeout(() => {
      router.push({
        pathname: '/',
      })
    }, 1000)
  })

  return (
    <Box>
      <Header title="Edit Recipe" />
      <MainLayout>
        <FormMainContainer>
          <FormSidebarContainer gap={2}>
            <BackButton href="/" label="back" />
            <FileUpload
              files={files}
              getInputProps={getInputProps}
              getRootProps={getRootProps}
            />
          </FormSidebarContainer>
          <FormContainer>
            <form onSubmit={onSubmit}>
              <Stack gap={2}>
                <FormTextField
                  name="name"
                  label="Name"
                  control={control}
                  errors={errors}
                />
                <FormTextField
                  name="email"
                  label="Email Address"
                  control={control}
                  errors={errors}
                />
                <FormTextField
                  name="title"
                  label="Title"
                  control={control}
                  errors={errors}
                  readonly
                />
                <FormTextField
                  name="description"
                  label="Description"
                  control={control}
                  errors={errors}
                  multiline
                />
                <FormTextField
                  name="ingredients"
                  label="Ingredients"
                  control={control}
                  errors={errors}
                  multiline
                />
                <FormTextField
                  name="instructions"
                  label="Instructions"
                  control={control}
                  errors={errors}
                  multiline
                />

                <FormButtonContainer gap={2}>
                  <Button variant="contained" color="warning">
                    Delete
                  </Button>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </FormButtonContainer>
              </Stack>
            </form>
          </FormContainer>
        </FormMainContainer>
      </MainLayout>
      <Toast
        message="Recipe successfully updated"
        isOpen={isOpenToast}
        setIsOpen={setIsOpenToast}
      />
    </Box>
  )
}
