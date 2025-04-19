import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RecipeSchema } from '@/schema/RecipeSchema'
import { Box, Button, Stack } from '@mui/material'
import { Header } from '@/components/common/Header'
import { MainLayout } from '@/components/layouts/MainLayout'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import { FormTextField } from '@/components/forms/FormTextField'
import { Recipe } from '@/types/Recipes'
import { useRecipes } from '@/providers/RecipesProvider'
import { INTIAL_FORM_VALUE } from '@/constants/Form'
import { generateUUIDv4 } from '@/helpers/id'
import { FileUpload } from '@/components/common/FileUpload'
import { PreviewableFile } from '@/types/File'
import { FormMainContainer } from '@/components/layouts/FormMainContainer'
import { FormSidebarContainer } from '@/components/layouts/FormSidebarContainer'
import { FormContainer } from '@/components/layouts/FormContainer'
import { BackButton } from '@/components/common/BackButton'
import { FormButtonContainer } from '@/components/layouts/FormButtonContainer'
import { Toast } from '@/components/common/Toast'

export default function AddRecipe() {
  const { handleSetRecipes, recipes } = useRecipes()
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [files, setFiles] = useState<PreviewableFile[]>()
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
    reset,
    formState: { errors },
  } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: { ...INTIAL_FORM_VALUE, id: generateUUIDv4() },
  })

  const onSubmit = handleSubmit((newRecipe) => {
    if (!newRecipe) {
      throw Error('Invalid form value')
    }

    if (recipes) {
      handleSetRecipes([...recipes, { ...newRecipe }])
    }
    setIsOpenToast(true)
    reset(INTIAL_FORM_VALUE)
  })

  return (
    <Box>
      <Header title="Add Recipe" />
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

                <FormButtonContainer>
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
        message="Recipe successfully added"
        isOpen={isOpenToast}
        setIsOpen={setIsOpenToast}
      />
    </Box>
  )
}
