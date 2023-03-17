import heroImage from "../Images/hero1ElaineCasap.jpeg";

function HeroImage() {
	return (
		<div className='relative h-[100vh] snap-start'>
			<img
				className='filter brightness-50  blur-[1px] '
				src={heroImage}
				alt='People sharing tomates'
			/>
			<h1 className='absolute text-5xl text-white font-display top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
				Let's make sure every plate is full
				<br />
				<br />
				<br />
				<span className='text-2xl '>one share at a time.</span>
			</h1>
		</div>
	);
}

export default HeroImage;
