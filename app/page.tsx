import Image from "next/image";
import HeroSection from './components/homepage/herosection.jsx'
import LibrarySection from './components/LibrarySection'

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <LibrarySection/>
    </div>
  );
}
