'use client'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import Image from '@/components/Common/Image'

// Import Swiper styles
import 'swiper/css/pagination'
import 'swiper/css'

const HeroBanner = () => {
  return (
    <section className="overflow-hidden">
      <div className="max-w-screen w-full mx-auto px-4 sm:px-8 xl:px-0">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="hero-banner"
        >
          {[1, 2, 3].map((item, key) => (
            <SwiperSlide key={key}>
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={`/images/hero/hero-${item}.webp`}
                  alt="Hero Banner"
                  width={1920}
                  height={520}
                  className="w-full h-auto"
                />
                {/* <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-[400px]">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Xe đạp chất lượng cao
                  </h2>
                  <p className="text-white mb-6 hidden md:block">
                    Khám phá bộ sưu tập xe đạp mới nhất với chất lượng hàng đầu
                  </p>
                  <a
                    href="#"
                    className="inline-flex font-medium text-white bg-primary py-3 px-8 rounded-md hover:bg-primary-dark transition"
                  >
                    Mua ngay
                  </a>
                </div> */}
              </div>
            </SwiperSlide>
          ))}

          {/* <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/hero/banner-1.jpg"
                alt="Hero Banner"
                width={1170}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-[400px]">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Xe đạp chất lượng cao
                </h2>
                <p className="text-white mb-6 hidden md:block">
                  Khám phá bộ sưu tập xe đạp mới nhất với chất lượng hàng đầu
                </p>
                <a
                  href="#"
                  className="inline-flex font-medium text-white bg-primary py-3 px-8 rounded-md hover:bg-primary-dark transition"
                >
                  Mua ngay
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/hero/banner-2.jpg"
                alt="Hero Banner"
                width={1170}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-[400px]">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Phụ kiện chính hãng
                </h2>
                <p className="text-white mb-6 hidden md:block">
                  Nâng cấp trải nghiệm đạp xe với các phụ kiện chất lượng cao
                </p>
                <a
                  href="#"
                  className="inline-flex font-medium text-white bg-primary py-3 px-8 rounded-md hover:bg-primary-dark transition"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
      </div>
    </section>
  )
}

export default HeroBanner
