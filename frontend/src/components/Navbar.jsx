import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";

import { UserContext } from "../context/UserContext";
function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const { user, setUser } = useContext(UserContext);
	return (
		<header className='absolute inset-x-0 top-0 z-50 bg-black/80 '>
			<nav
				className='flex items-center justify-between p-6 lg:px-8'
				aria-label='Global'
			>
				<div className='flex lg:flex-1'>
					<a href='/' className='-m-1.5 p-1.5'>
						<span className='text-white font-logo text-3xl'>
							Bite Buddy
						</span>
					</a>
				</div>
				<div className='flex lg:hidden'>
					<button
						type='button'
						className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className='sr-only'>Open main menu</span>
						<Bars3Icon className='h-6 w-6' aria-hidden='true' />
					</button>
				</div>
				<div className='hidden lg:flex lg:gap-x-36 text-lg font-semibold leading-6 text-white'>
					<Link to='/database'>Find a Bite</Link>
					{user && <Link to='/newpost'>Post a Bite</Link>}
				</div>
				<div className='hidden lg:flex lg:flex-1 lg:justify-end text-white'>
					{user?.user ? (
						<a onClick={() => setUser(null)} to='#'>
							Logout
						</a>
					) : (
						<div className='flex gap-16 text-lg font-semibold '>
							<Link to='/login'>Sign In</Link>
							<Link to='/signup'>Sign Up!</Link>
						</div>
					)}
				</div>
			</nav>
			<Dialog
				as='div'
				className='lg:hidden'
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className='fixed inset-0 z-50' />
				<Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
					<div className='flex items-center justify-between'>
						<a href='/' className='-m-1.5 p-1.5'>
							<span className='text-4xl font-logo text-white'>
								Bite Buddy
							</span>
						</a>
						<button
							type='button'
							className='-m-2.5 rounded-md p-2.5 text-gray-400'
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className='sr-only'>Close menu</span>
							<XMarkIcon className='h-6 w-6' aria-hidden='true' />
						</button>
					</div>
					<div className='mt-6 flow-root'>
						<div className='-my-6 divide-y divide-gray-500/25'>
							<div className='space-y-2 py-6 text-white'>
								<Link to='/database'>Find a Bite</Link>
								{user && <Link to='/newpost'>Post a Bite</Link>}
							</div>
							<div className='py-6 text-white'>
								{user?.user ? (
									<a onClick={() => setUser(null)} to='#'>
										Logout
									</a>
								) : (
									<div className='flex flex-col'>
										<Link to='/login'>Sign In</Link>
										<Link to='/signup'>Sign Up!</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}

export default Navbar;
