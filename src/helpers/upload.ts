export const uploadImage = async <T>({
  file,
  fileName,
}: {
  file: File
  fileName: string
}) => {
  // Upload image
  const uploadFileData = new FormData()
  uploadFileData.set('file', file)
  uploadFileData.set('name', fileName)

  const upload = await fetch('/api/upload', {
    method: 'POST',
    body: uploadFileData,
  })

  const result = await upload.json()
  return result as T
}
