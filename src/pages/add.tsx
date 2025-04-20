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
import { getFileExtension } from '@/helpers/file'
import { uploadImage } from '@/helpers/upload'

export default function AddRecipe() {
  const { handleSetRecipes, recipes, checkTitleExists } = useRecipes()
  const [openState, setOpenState] = useState({
    addSuccessToast: false,
    formErrorToast: false,
  })
  const [files, setFiles] = useState<PreviewableFile[]>()
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['jpg', 'png', 'gif'],
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
    defaultValues: {
      ...INTIAL_FORM_VALUE,
      id: generateUUIDv4(),
      dateCreated: new Date(),
      dateModified: new Date(),
    },
  })

  const onSubmit = handleSubmit(async (newRecipe) => {
    try {
      if (!newRecipe) {
        throw Error('Invalid form value')
      }

      if (checkTitleExists(newRecipe.title)) {
        setOpenState({
          ...openState,
          formErrorToast: true,
        })
        throw Error('Title already exists')
      }

      if (!files?.length) {
        throw Error('No file selected')
      }

      const upload = await uploadImage<{ success: boolean }>({
        file: files[0],
        fileName: newRecipe.title,
      })

      if (!upload.success) {
        throw Error('Uploading image failed')
      }

      handleSetRecipes([
        ...(recipes || []),
        {
          ...newRecipe,
          image: `${newRecipe.title}.${getFileExtension(files[0].name)}`,
        },
      ])
      setOpenState({
        ...openState,
        addSuccessToast: true,
      })

      reset(INTIAL_FORM_VALUE)
      setFiles(undefined)
    } catch (e) {
      console.error(e)
    }
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
        isOpen={openState.addSuccessToast}
        setOnClose={() => {
          setOpenState({
            ...openState,
            addSuccessToast: false,
          })
        }}
        type="success"
      />
      <Toast
        message="Title already exists"
        isOpen={openState.formErrorToast}
        setOnClose={() => {
          setOpenState({
            ...openState,
            formErrorToast: false,
          })
        }}
        type="error"
      />
    </Box>
  )
}
