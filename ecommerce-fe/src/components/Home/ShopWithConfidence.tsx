import React from 'react'

import Image from '../Common/Image'

const ShopWithConfidence = () => {
  return (
    <div className="bg-[#d2f1d0] my-16 pt-10 pb-12">
      <div className="container">
        <h2 className="text-center text-3xl font-bold mb-8 text-primary">Yên tâm khi mua hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-2 lg:gap-6">
          {[1, 2, 3, 4].map((item, key) => (
            <div key={key} className="flex flex-col items-center">
              <Image
                src={`/images/shop-with-confidence/${item}.jpg`}
                alt="icon"
                width={573}
                height={117}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopWithConfidence
