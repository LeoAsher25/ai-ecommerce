import { Suspense } from 'react'

import { ReactQueryProvider } from '@/app/providers'
import { AppSessionProvider } from '@/components/AppSessionProvider'
import { AwaitComponent } from '@/components/Common/AwaitComponent'
import CartSidebarModal from '@/components/Common/CartSidebarModal'
import PreLoader from '@/components/Common/PreLoader'
import PreviewSliderModal from '@/components/Common/PreviewSlider'
import QuickViewModal from '@/components/Common/QuickViewModal'
import ScrollToTop from '@/components/Common/ScrollToTop'
import { ReduxProvider } from '@/redux/provider'
import { categoryService } from '@/services/category'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { CartModalProvider } from '../context/CartSidebarModalContext'
import { PreviewSliderProvider } from '../context/PreviewSliderContext'
import { ModalProvider } from '../context/QuickViewModalContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const promise = categoryService.getCategories()

  return (
    <Suspense fallback={<PreLoader />}>
      <AppSessionProvider>
        <ReactQueryProvider>
          <ReduxProvider>
            <CartModalProvider>
              <ModalProvider>
                <PreviewSliderProvider>
                  <Suspense fallback={<PreLoader />}>
                    <AwaitComponent promise={promise}>
                      {({ success, data }) => {
                        return <Header categories={success ? data.data : []} />
                      }}
                    </AwaitComponent>
                  </Suspense>
                  {children}

                  <QuickViewModal />
                  <CartSidebarModal />
                  <PreviewSliderModal />
                </PreviewSliderProvider>
              </ModalProvider>
            </CartModalProvider>
          </ReduxProvider>
        </ReactQueryProvider>
      </AppSessionProvider>
      <ScrollToTop />
      <Footer />
    </Suspense>
  )
}
