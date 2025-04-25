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
import { uploadImage } from '@/helpers/upload'
import { useRecipes } from '@/providers/RecipesProvider'
import { RecipeSchema } from '@/schema/RecipeSchema'
import { edit, remove, uploadImageAsync } from '@/state/recipes/recipesSlice'
import { AppDispatch, RootState } from '@/state/store'
import { PreviewableFile } from '@/types/File'
import { Recipe } from '@/types/Recipes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

const LazyLoadedConfirmDialog = dynamic(() =>
  import('../components/common/ConfirmDialog').then((mod) => mod.ConfirmDialog)
)

export default function EditRecipe() {
  const router = useRouter()
  const { recipes } = useSelector((state: RootState) => state.recipes)
  const dispatch = useDispatch<AppDispatch>()
  const [openState, setOpenState] = useState({
    editToast: false,
    deleteToast: false,
    deleteConfirmDialog: false,
  })
  const selectedRecipe = useMemo(() => {
    return recipes?.find((recipe) => {
      return router.query.id === recipe.id
    })
  }, [recipes, router.query.id])
  const [files, setFiles] = useState<PreviewableFile[]>()
  const [fileUploadError, setFileUploadError] = useState('')
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.png', '.gif'],
    },
    multiple: false,
    maxSize: 2000000, // 2MB
    onDropRejected: (e) => {
      setFileUploadError(e[0].errors[0].message)
    },
    onDropAccepted: () => {
      setFileUploadError('')
    },
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      ...selectedRecipe,
      dateCreated: new Date(selectedRecipe?.dateCreated || ''),
      dateModified: new Date(),
    },
  })

  useEffect(
    function reinitializeData() {
      if (!selectedRecipe) {
        return
      }
      reset({
        ...selectedRecipe,
        dateCreated: new Date(selectedRecipe.dateCreated),
        dateModified: new Date(selectedRecipe.dateModified),
      })
    },
    [selectedRecipe]
  )

  const onSubmit = handleSubmit(async (newRecipe) => {
    if (!newRecipe) {
      throw Error('Invalid form value')
    }

    if (files?.length) {
      // const upload = await uploadImage<{ success: boolean }>({
      //   file: files[0],
      //   fileName: newRecipe.title,
      // })

      // if (!upload.success) {
      //   throw Error('Uploading image failed')
      // }

      dispatch(
        uploadImageAsync({
          file: files[0],
          fileName: newRecipe.title,
        })
      )
    }

    if (recipes?.length) {
      const newRecipes = recipes.map((recipe) => {
        return recipe.id !== router.query.id ? recipe : { ...newRecipe }
      })
      // handleSetRecipes(newRecipes)

      dispatch(
        edit({
          ...newRecipe,
        })
      )
    }
    setOpenState({
      ...openState,
      editToast: true,
    })
    setFileUploadError('')
    setTimeout(() => {
      router.push({
        pathname: '/',
      })
    }, 1000)
  })

  const handleOpenDeleteConfirmation = () => {
    setOpenState({
      ...openState,
      deleteConfirmDialog: true,
    })
  }

  const handleCloseDeleteConfirmation = () => {
    setOpenState({
      ...openState,
      deleteConfirmDialog: false,
    })
  }

  const handleDeleteRecipe = () => {
    if (!selectedRecipe || !recipes) {
      throw Error('No recipe selected or available')
    }
    // const tempRecipes =
    //   recipes.filter((recipe) => {
    //     return selectedRecipe.id !== recipe.id
    //   }) || []

    // handleSetRecipes(tempRecipes)
    dispatch(remove(selectedRecipe.id))

    setOpenState({
      ...openState,
      deleteConfirmDialog: false,
      deleteToast: true,
    })

    setTimeout(() => {
      router.push({
        pathname: '/',
      })
    }, 500)
  }

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
              defaultValue={selectedRecipe?.image}
              error={fileUploadError}
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
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleOpenDeleteConfirmation}
                  >
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
        isOpen={openState.editToast}
        setOnClose={() => {
          setOpenState({
            ...openState,
            editToast: false,
          })
        }}
        type="success"
      />
      <Toast
        message="Recipe successfully deleted"
        isOpen={openState.deleteToast}
        setOnClose={() => {
          setOpenState({
            ...openState,
            deleteToast: false,
          })
        }}
        type="success"
      />
      {openState.deleteConfirmDialog && (
        <LazyLoadedConfirmDialog
          isOpen={openState.deleteConfirmDialog}
          onCloseClick={handleCloseDeleteConfirmation}
          title="Delete recipe confirmation"
          message="Are you sure you want to delete this recipe?"
          onConfirmClick={handleDeleteRecipe}
        />
      )}
    </Box>
  )
}
