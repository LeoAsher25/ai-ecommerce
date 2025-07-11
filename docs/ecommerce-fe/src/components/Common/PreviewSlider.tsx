'use client'
import { useRef } from 'react'

import Image from '@/components/Common/Image'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { usePreviewSlider } from '@/app/context/PreviewSliderContext'

import Modal from './Modal'

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen, imagesList } = usePreviewSlider()

  const sliderRef = useRef(null)

  return (
    <Modal
      open={isModalPreviewOpen}
      onClose={closePreviewModal}
      contentClassName="!w-[60vw] [&>*]:!max-h-screen"
    >
      <Swiper
        ref={sliderRef}
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {imagesList.map((image, index) => (
          <SwiperSlide key={image + index} className="w-full h-full">
            <div className="w-full h-full">
              <Image
                src={image}
                alt={'product image'}
                width={450}
                height={450}
                className="w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Modal>
  )
}

export default PreviewSliderModal
