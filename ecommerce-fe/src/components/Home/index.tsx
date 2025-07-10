import Newsletter from '../Common/Newsletter'

import AboutShopSection from './AboutShopSection'
import HeroBanner from './HeroBanner'
import ProductsByCategories from './ProductsByCategories'
import ShopWithConfidence from './ShopWithConfidence'

const Home = () => {
  return (
    <main>
      <HeroBanner />
      <AboutShopSection />
      <ShopWithConfidence />

      <ProductsByCategories />

      {/* <Testimonials /> */}
      {/* <Newsletter /> */}
    </main>
  )
}

export default Home
