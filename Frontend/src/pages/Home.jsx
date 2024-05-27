
import Footer from '../components/Footer'
import Featured from '../components/Home/Featured'
import FAQs from '../components/Home/faqs'
import HomeHero from '../components/Home/HomeHero'
import Monetize from '../components/Home/Monetize'

export default function Home() {
    return (
        <div className="bg-[#181818] text-white min-h-screen">
            <HomeHero />
            <Featured />
            <Monetize />
            <FAQs />
            <Footer />
        </div>
    )
}