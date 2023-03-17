import HeroImage from "../components/HeroImage";
import HeroSection from "../components/HeroSection";
import Intro from "../components/Intro";
import Mission from "../components/Mission";

export const HomePage = () => {
	return (
		<div className='snap-y snap-proximity'>
			<HeroSection />
			<Intro />
			<HeroImage />
			<Mission />
		</div>
	);
};
