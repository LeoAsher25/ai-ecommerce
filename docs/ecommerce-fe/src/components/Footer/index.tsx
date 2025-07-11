import React from 'react'

import Link from 'next/link'

import Image from '@/components/Common/Image'
import { CONTACT_INFORMATION } from '@/constants/information'

import ContactForm from './ContactForm'
import FacebookPage from './FacebookPage'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white overflow-hidden">
      <div className="px-4 lg:px-6 lg:py-8">
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between">
          {/* Contact Information */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-medium mb-4">THÔNG TIN LIÊN HỆ</h2>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-2">
                <span className="flex-shrink-0">Địa chỉ:</span>
                <span>
                  {CONTACT_INFORMATION.address}
                  <br />
                  (Số cũ : {CONTACT_INFORMATION.oldAddress})
                </span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">Hotline:</span>
                <a href={`tel:${CONTACT_INFORMATION.phoneNumber}`} className="hover:text-primary">
                  {CONTACT_INFORMATION.phoneNumber}
                </a>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0">Email:</span>
                <a href={`mailto:${CONTACT_INFORMATION.email}`} className="hover:text-primary">
                  {CONTACT_INFORMATION.email}
                </a>
              </li>
            </ul>

            {/* Contact Form */}
            <div className="mt-4">
              <ContactForm />
            </div>
          </div>

          {/* Policies */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-medium mb-4">CHÍNH SÁCH & HƯỚNG DẪN</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/chinh-sach-giao-hang" className="hover:text-primary">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-thanh-toan" className="hover:text-primary">
                  Chính sách thanh toán
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-hanh" className="hover:text-primary">
                  Chính sách bảo hành xe đạp
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-doi-tra-hang" className="hover:text-primary">
                  Chính sách đổi trả hàng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-primary">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>

            {/* Certification */}
            <div className="mt-6">
              <Link href="https://moit.gov.vn/" target="_blank">
                <Image
                  src="/images/footer/bo-cong-thuong.png"
                  alt="Đã thông báo Bộ Công Thương"
                  width={229.84}
                  height={86.95}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Facebook Widget */}
          <FacebookPage />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        <div className="max-w-[1170px] mx-auto px-4">
          <p className="mb-1">Hộ Kinh Doanh Thế Thao Hoàng Yến 88</p>
          <p className="mb-1">
            GPDKKD số 41L8042968 do phòng Tài Chính & Kế Hoạch Quận 12 cấp ngày 12/08/2024
          </p>
          <p className="mb-1">Hotline: {CONTACT_INFORMATION.phoneNumber}</p>
          <p className="mt-4">Copyright {year} © Topxedap.com | Thiết kế bởi TOP XE ĐẠP</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
