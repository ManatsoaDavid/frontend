import { motion } from "framer-motion"
import SearchAndIntro from "../../../shared/composant/SearchSection"
import FeatureCardSection from "./FeatureCardSection"
import CelebratedPractitionersSection from "./celebratedPractitionersSection"
import Description from "./description"
import Footer from "./footer"
import SpecialtyListSection from "./listeSpecialite"
import Navbar from "./navbar"

const PublicHome = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2, ease: 'easeIn', duration: 0.8 }
      }}
    >
      <div>
        <div className="">
          <div>
            <Navbar />
          </div>
          <div>
            <SearchAndIntro />
          </div>

        </div>
      </div>
      <FeatureCardSection />
      <div>
        <div>
          <SpecialtyListSection />
        </div>

        <div>
          <Description />
        </div>
        <div>
          <CelebratedPractitionersSection />
        </div>
        <Footer />
      </div>
    </motion.div>
  )
}

export default PublicHome
