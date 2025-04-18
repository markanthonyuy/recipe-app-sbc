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
}

export const FileUpload = (props: Props) => {
  return (
    <DropZoneContainer {...props.getRootProps({ className: 'dropzone' })}>
      <input {...props.getInputProps()} />
      {props.files?.length && props.files[0]?.preview ? (
        <Image
          src={props.files[0]?.preview}
          onLoad={() => {
            if (props?.files?.[0].preview) {
              URL.revokeObjectURL(props.files[0].preview)
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
  )
}
