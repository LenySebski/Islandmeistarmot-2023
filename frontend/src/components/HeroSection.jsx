import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function HeroSection() {
	const { user } = useContext(UserContext);
	return (
		<div className='bg-gray-900'>
			<div className='relative isolate overflow-hidden pt-14'>
				<img
					src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
					alt=''
					className='absolute inset-0 -z-10 h-full w-full object-cover'
				/>
				<div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
					<svg
						className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
						viewBox='0 0 1155 678'
					>
						<path
							fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
							fillOpacity='.2'
							d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
						/>
						<defs>
							<linearGradient
								id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
								x1='1155.49'
								x2='-78.208'
								y1='.177'
								y2='474.645'
								gradientUnits='userSpaceOnUse'
							>
								<stop stopColor='#9089FC' />
								<stop offset={1} stopColor='#FF80B5' />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<div className='mx-auto max-w-2xl py-32 sm:py-[30vh] h-[100vh]'>
					<div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
					<div className='text-center'>
						<h1 className='text-4xl font-bold  tracking-wide text-white sm:text-6xl'>
							Share your food,
							<br />
							<br />
							<span className='text-5xl'>share your love</span>
						</h1>
						<p className='mt-6 text-lg leading-8 text-gray-300'>
							with Bite Buddy
						</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							{user ? (
								<Link
									to='newpost'
									className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
								>
									Get started
								</Link>
							) : (
								<Link
									to='signup'
									className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400'
								>
									Get started
								</Link>
							)}
							<a
								href='#Mission'
								className='text-sm font-semibold leading-6 text-white'
							>
								Learn more <span aria-hidden='true'>→</span>
							</a>
						</div>
					</div>
				</div>
				<div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
					<svg
						className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
						viewBox='0 0 1155 678'
					>
						<path
							fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
							fillOpacity='.2'
							d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
						/>
						<defs>
							<linearGradient
								id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
								x1='1155.49'
								x2='-78.208'
								y1='.177'
								y2='474.645'
								gradientUnits='userSpaceOnUse'
							>
								<stop stopColor='#9089FC' />
								<stop offset={1} stopColor='#FF80B5' />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	);
}
