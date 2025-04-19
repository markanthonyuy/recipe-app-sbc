import fs from 'node:fs/promises'
import { NextApiResponse, NextApiRequest } from 'next'
import { IncomingForm } from 'formidable'
import { UPLOAD_DIR } from '@/constants/Upload'
import { getFileExtension } from '@/helpers/file'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    let fileName = ''
    let fileExt = ''
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm({
        uploadDir: UPLOAD_DIR,
        filename: (name, ext, form) => {
          fileExt = ext
            ? ext
            : getFileExtension(form.originalFilename || '') || ''
          fileName = form.originalFilename || `${name}.${ext}`
          return fileName
        },
      })
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })

    fs.rename(
      `./public/images/${fileName}`,
      // @ts-ignore fix later
      `./public/images/${data.fields.name[0]}.${fileExt}`
    )

    return res.json({ status: 'success' })
  } catch (e) {
    console.error(e)
    return res.json({ status: 'fail', error: e })
  }
}
