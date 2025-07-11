'use client'
import NextImage, { ImageProps } from 'next/image'

const Image = ({ src, ...props }: ImageProps) => {
  return (
    <NextImage
      src={src || '/default.png'}
      onError={(e) => (e.currentTarget.srcset = '/default.png')}
      {...props}
    />
  )
}
export default Image
