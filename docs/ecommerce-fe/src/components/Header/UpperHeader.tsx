import { useState } from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux'

import { useCartModalContext } from '@/app/context/CartSidebarModalContext'
import Image from '@/components/Common/Image'
import { UPPER_HEADER_HEIGHT } from '@/constants'
import { CONTACT_INFORMATION } from '@/constants/information'
import { selectTotalPrice } from '@/redux/features/cart-slice'
import { useAppSelector } from '@/redux/store'
import { formatPrice } from '@/utils/string'

import HeaderUserWrap from './HeaderUserWrap'
import SearchInput from './SearchInput'

interface IUpperHeaderProps {
  isLargeMenu: boolean
}

const UpperHeader = ({ isLargeMenu }: IUpperHeaderProps) => {
  const [navigationOpen, setNavigationOpen] = useState(false)

  const { openCartModal } = useCartModalContext()

  const product = useAppSelector((state) => state.cartReducer.items)
  const totalPrice = useSelector(selectTotalPrice)

  return (
    <div className="px-4 sm:px-7.5 xl:px-0 border-b border-gray-3 ">
      <div
        className={`max-w-[1170px] mx-auto flex gap-5 items-center justify-between ease-out duration-200`}
        style={{
          height: isLargeMenu ? UPPER_HEADER_HEIGHT : UPPER_HEADER_HEIGHT - 16,
        }}
      >
        <div className="xl:w-auto flex-col sm:flex-row flex sm:justify-between sm:items-center gap-5 sm:gap-10">
          <Link className="flex-shrink-0" href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={50}
              className="w-auto h-[60px] object-contain max-h-[70px]"
            />
          </Link>
        </div>

        <div className="flex-1 max-w-[400px]">
          <SearchInput />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.7177 3.09215C5.94388 1.80121 7.9721 2.04307 8.98569 3.47665L10.2467 5.26014C11.0574 6.4068 10.9889 8.00097 10.0214 9.01965L9.7765 9.27743C9.77582 9.27921 9.7751 9.28115 9.77436 9.28323C9.76142 9.31959 9.7287 9.43538 9.7609 9.65513C9.82765 10.1107 10.1793 11.0364 11.607 12.5394C13.0391 14.0472 13.9078 14.4025 14.3103 14.4679C14.484 14.4961 14.5748 14.4716 14.6038 14.4614L15.0124 14.0312C15.8862 13.1113 17.2485 12.9301 18.347 13.5623L20.2575 14.662C21.8904 15.6019 22.2705 17.9011 20.9655 19.275L19.545 20.7705C19.1016 21.2373 18.497 21.6358 17.75 21.7095C15.9261 21.8895 11.701 21.655 7.27161 16.9917C3.13844 12.6403 2.35326 8.85538 2.25401 7.00615L2.92011 6.9704L2.25401 7.00615C2.20497 6.09248 2.61224 5.30879 3.1481 4.74464L4.7177 3.09215ZM7.7609 4.34262C7.24855 3.61797 6.32812 3.57473 5.80528 4.12518L4.23568 5.77767C3.90429 6.12656 3.73042 6.52646 3.75185 6.92576C3.83289 8.43558 4.48307 11.8779 8.35919 15.9587C12.4234 20.2375 16.1676 20.3584 17.6026 20.2167C17.8864 20.1887 18.1783 20.0313 18.4574 19.7375L19.8779 18.2419C20.4907 17.5968 20.3301 16.4345 19.5092 15.962L17.5987 14.8624C17.086 14.5673 16.4854 14.6584 16.1 15.0642L15.6445 15.5437L15.1174 15.043C15.6445 15.5438 15.6438 15.5445 15.6432 15.5452L15.6417 15.5467L15.6388 15.5498L15.6324 15.5562L15.6181 15.5704C15.6078 15.5803 15.5959 15.5913 15.5825 15.6031C15.5556 15.6266 15.5223 15.6535 15.4824 15.6819C15.4022 15.7387 15.2955 15.8012 15.1606 15.8544C14.8846 15.9633 14.5201 16.0216 14.0699 15.9485C13.1923 15.806 12.0422 15.1757 10.5194 13.5724C8.99202 11.9644 8.40746 10.7647 8.27675 9.87259C8.21022 9.41852 8.26346 9.05492 8.36116 8.78035C8.40921 8.64533 8.46594 8.53766 8.51826 8.4559C8.54435 8.41514 8.56922 8.381 8.5912 8.35322C8.60219 8.33933 8.61246 8.32703 8.62182 8.31627L8.63514 8.30129L8.64125 8.29465L8.64415 8.29154L8.64556 8.29004C8.64625 8.28931 8.64694 8.28859 9.17861 8.79357L8.64695 8.28858L8.93376 7.98662C9.3793 7.51755 9.44403 6.72317 9.02189 6.1261L7.7609 4.34262Z"
                fill="#FD0000"
              />
              <path
                d="M13.2595 1.88008C13.3257 1.47119 13.7122 1.19381 14.1211 1.26001C14.1464 1.26485 14.2279 1.28007 14.2705 1.28958C14.3559 1.30858 14.4749 1.33784 14.6233 1.38106C14.9201 1.46751 15.3347 1.60991 15.8323 1.83805C16.8286 2.2948 18.1544 3.09381 19.5302 4.46961C20.906 5.84541 21.705 7.17122 22.1617 8.1675C22.3899 8.66511 22.5323 9.07972 22.6187 9.3765C22.6619 9.5249 22.6912 9.64393 22.7102 9.72926C22.7197 9.77193 22.7267 9.80619 22.7315 9.8315L22.7373 9.86269C22.8034 10.2716 22.5286 10.6741 22.1197 10.7403C21.712 10.8063 21.3279 10.5303 21.2601 10.1233C21.258 10.1124 21.2522 10.083 21.2461 10.0553C21.2337 9.99994 21.2124 9.91212 21.1786 9.79597C21.1109 9.56363 20.9934 9.2183 20.7982 8.79262C20.4084 7.94232 19.7074 6.76813 18.4695 5.53027C17.2317 4.2924 16.0575 3.59141 15.2072 3.20158C14.7815 3.00642 14.4362 2.88889 14.2038 2.82122C14.0877 2.78739 13.9417 2.75387 13.8863 2.74154C13.4793 2.67372 13.1935 2.2878 13.2595 1.88008Z"
                fill="#FD0000"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4861 5.32955C13.5999 4.93128 14.015 4.70066 14.4133 4.81445L14.2072 5.53559C14.4133 4.81445 14.4136 4.81455 14.414 4.81465L14.4147 4.81486L14.4162 4.81531L14.4196 4.81628L14.4273 4.81859L14.4471 4.82476C14.4622 4.82958 14.481 4.83586 14.5035 4.84383C14.5484 4.85976 14.6077 4.88243 14.6805 4.91363C14.8262 4.97607 15.0253 5.07249 15.2698 5.2172C15.7593 5.50688 16.4275 5.98806 17.2124 6.77303C17.9974 7.558 18.4786 8.22619 18.7683 8.71565C18.913 8.96016 19.0094 9.15923 19.0718 9.30491C19.103 9.37772 19.1257 9.43708 19.1416 9.48199C19.1496 9.50444 19.1559 9.52327 19.1607 9.53835L19.1669 9.55814L19.1692 9.56589L19.1702 9.56922L19.1706 9.57075L19.1708 9.57148C19.1709 9.57184 19.171 9.57219 18.4499 9.77823L19.171 9.57219C19.2848 9.97047 19.0542 10.3856 18.6559 10.4994C18.261 10.6122 17.8496 10.3864 17.7317 9.99438L17.728 9.9836C17.7227 9.96858 17.7116 9.93899 17.6931 9.89579C17.6561 9.80946 17.589 9.66823 17.4774 9.47963C17.2544 9.10289 16.8517 8.53364 16.1518 7.83369C15.4518 7.13374 14.8826 6.73103 14.5058 6.50806C14.3172 6.39645 14.176 6.32935 14.0897 6.29235C14.0465 6.27383 14.0169 6.2628 14.0019 6.25747L13.9911 6.25377C13.599 6.13589 13.3733 5.72445 13.4861 5.32955Z"
                fill="#FD0000"
              />
            </svg>

            <div>
              <span className="block text-2xs text-dark-4 uppercase">24/7 SUPPORT</span>
              <p className="font-medium text-custom-sm text-dark">
                {CONTACT_INFORMATION.phoneNumber}
              </p>
            </div>
          </div>

          <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

          <div className="flex w-full lg:w-auto justify-between items-center gap-5">
            <div className="flex items-center gap-5">
              <HeaderUserWrap />

              <button onClick={openCartModal} className="flex items-center gap-2.5">
                <span className="inline-block relative">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5433 9.5172C15.829 9.21725 15.8174 8.74252 15.5174 8.45686C15.2175 8.17119 14.7428 8.18277 14.4571 8.48272L12.1431 10.9125L11.5433 10.2827C11.2576 9.98277 10.7829 9.97119 10.483 10.2569C10.183 10.5425 10.1714 11.0173 10.4571 11.3172L11.6 12.5172C11.7415 12.6658 11.9378 12.75 12.1431 12.75C12.3483 12.75 12.5446 12.6658 12.6862 12.5172L15.5433 9.5172Z"
                      fill="#FD0000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.29266 2.7512C1.43005 2.36044 1.8582 2.15503 2.24896 2.29242L2.55036 2.39838C3.16689 2.61511 3.69052 2.79919 4.10261 3.00139C4.54324 3.21759 4.92109 3.48393 5.20527 3.89979C5.48725 4.31243 5.60367 4.76515 5.6574 5.26153C5.66124 5.29706 5.6648 5.33321 5.66809 5.36996L17.1203 5.36996C17.9389 5.36995 18.7735 5.36993 19.4606 5.44674C19.8103 5.48584 20.1569 5.54814 20.4634 5.65583C20.7639 5.76141 21.0942 5.93432 21.3292 6.23974C21.711 6.73613 21.7777 7.31414 21.7416 7.90034C21.7071 8.45845 21.5686 9.15234 21.4039 9.97723L21.3935 10.0295L21.3925 10.0341L20.8836 12.5033C20.7339 13.2298 20.6079 13.841 20.4455 14.3231C20.2731 14.8346 20.0341 15.2842 19.6076 15.6318C19.1811 15.9793 18.6925 16.1226 18.1568 16.1882C17.6518 16.25 17.0278 16.25 16.2862 16.25L10.8804 16.25C9.53464 16.25 8.44479 16.25 7.58656 16.1283C6.69032 16.0012 5.93752 15.7285 5.34366 15.1022C4.79742 14.526 4.50529 13.9144 4.35897 13.0601C4.22191 12.2598 4.20828 11.2125 4.20828 9.75996V7.03832C4.20828 6.29837 4.20726 5.80316 4.16611 5.42295C4.12678 5.0596 4.05708 4.87818 3.96682 4.74609C3.87876 4.61723 3.74509 4.4968 3.44186 4.34802C3.11902 4.18961 2.68026 4.03406 2.01266 3.79934L1.75145 3.7075C1.36068 3.57012 1.15527 3.14197 1.29266 2.7512ZM5.70828 6.86996L5.70828 9.75996C5.70828 11.249 5.72628 12.1578 5.83744 12.8068C5.93933 13.4018 6.11202 13.7324 6.43219 14.0701C6.70473 14.3576 7.08235 14.5418 7.79716 14.6432C8.53783 14.7482 9.5209 14.75 10.9377 14.75H16.2406C17.0399 14.75 17.5714 14.7487 17.9746 14.6993C18.3573 14.6525 18.5348 14.571 18.66 14.469C18.7853 14.3669 18.9009 14.2095 19.024 13.8441C19.1537 13.4592 19.2623 12.9389 19.4237 12.156L19.9225 9.73591L19.9229 9.73369C20.1005 8.84376 20.217 8.2515 20.2444 7.80793C20.2704 7.38648 20.2043 7.23927 20.1429 7.15786C20.1367 7.15259 20.0931 7.11565 19.9661 7.07101C19.8107 7.01639 19.5895 6.97049 19.2939 6.93745C18.6991 6.87096 17.9454 6.86996 17.089 6.86996H5.70828Z"
                      fill="#FD0000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.2502 19.5C5.2502 20.7426 6.25756 21.75 7.5002 21.75C8.74285 21.75 9.7502 20.7426 9.7502 19.5C9.7502 18.2573 8.74285 17.25 7.5002 17.25C6.25756 17.25 5.2502 18.2573 5.2502 19.5ZM7.5002 20.25C7.08599 20.25 6.7502 19.9142 6.7502 19.5C6.7502 19.0857 7.08599 18.75 7.5002 18.75C7.91442 18.75 8.2502 19.0857 8.2502 19.5C8.2502 19.9142 7.91442 20.25 7.5002 20.25Z"
                      fill="#FD0000"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.25 19.5001C14.25 20.7427 15.2574 21.7501 16.5 21.7501C17.7426 21.7501 18.75 20.7427 18.75 19.5001C18.75 18.2574 17.7426 17.2501 16.5 17.2501C15.2574 17.2501 14.25 18.2574 14.25 19.5001ZM16.5 20.2501C16.0858 20.2501 15.75 19.9143 15.75 19.5001C15.75 19.0859 16.0858 18.7501 16.5 18.7501C16.9142 18.7501 17.25 19.0859 17.25 19.5001C17.25 19.9143 16.9142 20.2501 16.5 20.2501Z"
                      fill="#FD0000"
                    />
                  </svg>

                  <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-primary w-4.5 h-4.5 rounded-full text-white">
                    {product?.length}
                  </span>
                </span>

                <div>
                  <span className="block text-2xs text-dark-4 uppercase">cart</span>
                  <p className="font-medium text-custom-sm text-dark">{formatPrice(totalPrice)}</p>
                </div>
              </button>
            </div>

            <button
              id="Toggle"
              aria-label="Toggler"
              className="xl:hidden block"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              <span className="block relative cursor-pointer w-5.5 h-5.5">
                <span className="du-block absolute right-0 w-full h-full">
                  <span
                    className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                      !navigationOpen && '!w-full delay-300'
                    }`}
                  ></span>
                  <span
                    className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                      !navigationOpen && '!w-full delay-400'
                    }`}
                  ></span>
                  <span
                    className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                      !navigationOpen && '!w-full delay-500'
                    }`}
                  ></span>
                </span>

                <span className="block absolute right-0 w-full h-full rotate-45">
                  <span
                    className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                      !navigationOpen && '!h-0 delay-[0] '
                    }`}
                  ></span>
                  <span
                    className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                      !navigationOpen && '!h-0 dealy-200'
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpperHeader
