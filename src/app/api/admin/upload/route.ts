import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET = process.env.AWS_S3_BUCKET_NAME!
console.log(BUCKET)
export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const fileExt = file.name.split('.').pop()
  const key = `products/${uuidv4()}.${fileExt}`

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
     
      })
    )
    const url = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error('S3 upload error:', error)
    return NextResponse.json({ error: 'Error uploading to S3', details: error }, { status: 500 })
  }
} 