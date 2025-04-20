import { FILE_UPLOAD_IMAGE_WIDTH } from '@/constants/Upload'
import { PreviewableFile } from '@/types/File'
import { styled, Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

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

type Props = {
  files?: PreviewableFile[]
  getRootProps: ReturnType<typeof useDropzone>['getRootProps']
  getInputProps: ReturnType<typeof useDropzone>['getInputProps']
  defaultValue?: string
}

export const FileUpload = (props: Props) => {
  return (
    <DropZoneContainer {...props.getRootProps({ className: 'dropzone' })}>
      <input {...props.getInputProps()} />
      {props.files?.length && props.files[0]?.preview ? (
        // Preview from file upload
        <Image
          src={props.files[0]?.preview}
          onLoad={() => {
            if (props?.files?.[0].preview) {
              URL.revokeObjectURL(props.files[0].preview)
            }
          }}
          height={FILE_UPLOAD_IMAGE_WIDTH}
          width={FILE_UPLOAD_IMAGE_WIDTH}
          alt="Photo of the recipe"
        />
      ) : props.defaultValue ? (
        // Preview from file data
        <img
          src={`/images/${props.defaultValue}?${Date.now()}`}
          height={FILE_UPLOAD_IMAGE_WIDTH}
          width={FILE_UPLOAD_IMAGE_WIDTH}
          alt="Photo of the recipe"
        />
      ) : (
        <Typography>Upload photo</Typography>
      )}
    </DropZoneContainer>
  )
}
