import { motion } from "framer-motion"
import CelebratedPractitionersSection from "public/pages/layout/celebratedPractitionersSection"
import Description from "public/pages/layout/description"
import Footer from "public/pages/layout/footer"
import SearchAndIntro from "shared/composant/SearchSection"
import PractitionerSection from "./component/practitionerSection"


const VisitorHome = () => {
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
            <SearchAndIntro />
          </div>
        </div>
        <div>
          <PractitionerSection />
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

export default VisitorHome
