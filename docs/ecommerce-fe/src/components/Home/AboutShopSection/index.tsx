'use client'

import { useState } from 'react'

import IcArrowDown from '@/app/assets/icons/IcArrowDown'
import Image from '@/components/Common/Image'

export default function AboutShopSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="container my-12 flex flex-col-reverse lg:flex-row items-stretch gap-6 rounded-xl">
      {/* LEFT: Info Box */}
      <div className="lg:w-1/2 border border-dashed border-primary rounded-xl p-5 bg-white relative flex flex-col justify-between transition-all duration-300">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-dark mb-1">TOP XE ĐẠP</h2>
          <p className="text-center text-xl font-semibold text-dark mb-4">Shop Xe Đạp Số 1 TpHCM</p>

          <p className="text-base text-dark mb-2">
            Đa dạng các mẫu xe đạp <strong>Đẹp – Chất Lượng</strong> được chọn lọc từ các thương
            hiệu nổi tiếng.
          </p>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? 'max-h-[1500px]' : 'max-h-[110px]'
            }`}
          >
            <p className="text-base text-dark">
              <strong>Top Xe Đạp</strong> là cửa hàng xe đạp uy tín hàng đầu tại TpHCM – Chuyên phân
              phối các loại xe đạp và phụ kiện chính hãng, chất lượng đến từ các thương hiệu nổi
              tiếng như:{' '}
              <span className="font-semibold">
                Fornix, Vicky, LanQ, Jianer, Xaming, Galaxy, Trinx, ...
              </span>
            </p>

            <div className="mt-3 text-base space-y-1 text-dark">
              <div className="flex items-start gap-2">
                <span>✅</span>
                <span>
                  Xe đạp chính hãng – Được lắp ráp cẩn thận, căn chỉnh chắc chắn, hoàn thiện từng
                  chi tiết.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span>🚚</span>
                <span>Giao hàng toàn quốc – Miễn phí giao hàng ở TpHCM.</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🔍</span>
                <span>Nhận hàng được kiểm tra – Đi thử mới thanh toán.</span>
              </div>
              <div className="flex items-start gap-2">
                <span>♻️</span>
                <span>Lỗi 1 đổi 1 nhanh gọn – Dễ dàng.</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🛠️</span>
                <span>Miễn phí bảo hành xe tại nhà ở TpHCM.</span>
              </div>
            </div>

            <p className="mt-4 text-base text-dark">
              Nếu bạn đang cần mua xe đạp chính hãng, chất lượng tại một địa chỉ uy tín, chuyên
              nghiệp thì hãy liên hệ ngay với <strong>Top Xe Đạp</strong> để được tư vấn và hỗ trợ
              nhé!
            </p>

            <div className="mt-4 text-base text-dark space-y-1">
              <p>
                📲 Tư Vấn Sản Phẩm: <span className="text-red-600 font-semibold">033 922 1628</span>
              </p>
              <p>
                📲 Tư vấn qua Zalo: <span className="text-red-600 font-semibold">Chat ngay</span>
              </p>
              <p>
                📲 Tư vấn qua Facebook:{' '}
                <span className="text-red-600 font-semibold">Chat ngay</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 border border-primary border-dashed text-center pl-1 w-[130px] py-1 rounded flex justify-center items-center gap-1 text-sm text-dark hover:text-dark transition"
          >
            {expanded ? 'Thu gọn' : 'Xem thêm'}
            <div
              style={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
              className="duration-500"
            >
              <IcArrowDown />
            </div>
          </button>
        </div>
      </div>

      {/* RIGHT: Image */}
      <div className="lg:w-1/2 relative min-h-[280px]">
        <Image
          src="/images/about/cua-hang-xe-dap-HCM.jpg" // Đổi thành đường dẫn ảnh thực tế
          alt="Ảnh shop xe đạp"
          width={1024}
          height={772}
          className="object-cover rounded-xl w-full h-auto"
        />
      </div>
    </section>
  )
}
