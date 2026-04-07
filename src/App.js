import './index.css';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import PillarsSection from "./components/PillarsSection";
import TrustSection from "./components/TrustSection";
import WhyReportSection from "./components/WhyReportSection";
import PeopleSection from './components/PeopleSection';
import FraudSection from './components/FraudSection';
import Question from './components/Question';
import GeographicSection from './components/GeographicSection';
import Risk from './components/Risk';
import SpikesSection from './components/SpikeSection';
import StoryDataSection from './components/Storydatasection';
import ImpactSection from './components/ImpactSection';
import FraudImpact from './components/FraudImpact';
import CaseFilesSection from './components/CaseFile';
import ReferralRingSection from './components/RefferalRing';
import GpsSpoofer from './components/GpsSpoofer';
import WhyForward from './components/whyForward'
import Footer from './components/Footer';
export default function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <PillarsSection />
      <TrustSection />
      <WhyReportSection />
      <PeopleSection />
      <FraudSection/>
      <Question />
      <GeographicSection/>
      <Risk />
      <SpikesSection />
      {/* <StoryDataSection /> */}
      <ImpactSection />
      <FraudImpact/>
      <CaseFilesSection />
      <ReferralRingSection />
            <GpsSpoofer/>
<WhyForward/>
<Footer/>
    </div>
  );
}
