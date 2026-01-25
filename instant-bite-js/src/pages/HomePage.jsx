import Hero from '../components/hero/Hero';
import MenuTicker from '../components/ui/MenuTicker';
import PageTransition from '../components/layout/PageTransition';
import FeaturedSection from '../components/home/FeaturedSection';
import Testimonials from '../components/home/Testimonials';
import ChefsSection from '../components/home/ChefsSection';
import ServicesSection from '../components/home/ServicesSection';
import AppPromo from '../components/home/AppPromo';

export default function HomePage() {
    return (
        <PageTransition>
            <Hero />
            <MenuTicker />
            <FeaturedSection />
            <Testimonials />
            <ChefsSection />
            <ServicesSection />
            <AppPromo />
        </PageTransition>
    );
}
