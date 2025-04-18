import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RecipeSchema } from '@/schema/RecipeSchema'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { Header } from '@/components/common/Header'
import { MainLayout } from '@/components/layouts/MainLayout'
import {
  DRAWER_WIDTH,
  MAIN_HEADER_HEIGHT,
  MAIN_HEADER_HEIGHT_WITH_PADDING,
} from '@/constants/Misc'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import { FormTextField } from '@/components/forms/FormTextField'
import { Recipe } from '@/types/Recipes'
import Link from 'next/link'

const BaseMainContent = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  paddingTop: 20,
  paddingBottom: 20,
  marginTop: MAIN_HEADER_HEIGHT_WITH_PADDING, // Height of AppBar
  height: `calc(100vh - ${MAIN_HEADER_HEIGHT}px)`,
  overflowY: 'auto',
  background: '#f3f3f3',
})

const SideContent = styled(Stack)({
  width: DRAWER_WIDTH,
  paddingLeft: 20,
  paddingRight: 20,
})
const Content = styled(Box)({
  flexGrow: 1,
  paddingRight: 20,
})
const DropZoneContainer = styled(Box)({
  padding: 20,
  border: '1px dashed #ccc',
  background: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 200,
  cursor: 'pointer',
  overflow: 'hidden',
  objectFit: 'cover',
})
const ButtonContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
})

const BackButtonContainer = styled(Box)({
  display: 'inline-block',
})

type PreviewableFile = File & {
  preview?: string
}

export default function AddRecipe() {
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
    formState: { errors },
  } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      dateCreated: new Date(),
      isFavorite: false,
    },
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  console.log(errors)

  return (
    <Box>
      <Header title="Add Recipe" />
      <MainLayout>
        <BaseMainContent>
          <SideContent gap={2}>
            <BackButtonContainer>
              <Link href="/">
                <Button
                  component="label"
                  variant="text"
                  tabIndex={-1}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Link>
            </BackButtonContainer>
            <DropZoneContainer {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {files?.length && files[0]?.preview ? (
                <Image
                  src={files[0]?.preview}
                  onLoad={() => {
                    if (files[0].preview) {
                      URL.revokeObjectURL(files[0].preview)
                    }
                  }}
                  height={300}
                  width={300}
                  alt="Photo"
                />
              ) : (
                <Typography>Upload photo</Typography>
              )}
            </DropZoneContainer>
          </SideContent>
          <Content>
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

                <ButtonContainer gap={2}>
                  {/* <Button variant="contained" color="warning">
                    Delete
                  </Button> */}
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </ButtonContainer>
              </Stack>
            </form>
          </Content>
        </BaseMainContent>
      </MainLayout>
    </Box>
  )
}
