import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/20/solid'


const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState(null);
	const navigate = useNavigate();
	const context = useContext(UserContext);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = { username, password };
		const res = await fetch(`${import.meta.env.VITE_URL_BASE}/signin`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		});
		const data = await res.json();
		console.log(data);
		if (data.error) {
			setError(data.error);
		} else {
			context.setUser({ user: data.user, token: data.token });

			setNotification("Login successful! Redirecting to home page...");
			setTimeout(() => {
				navigate("/");
			}, 1500);
		}
	};


	return (
		<div className="flex h-[100vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-logo">Bite Buddy</h2>
				<p className="mt-2 text-center text-sm text-gray-600">Share your food, share your love!</p>
				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
				<div className="-space-y-px rounded-md shadow-sm">
					<div>
					<label className='sr-only'></label>
						<input
							className='relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							type='text'
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
						/>
					</div>
	
					<label className='sr-only'></label>
						<input
							className='relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							type='password'
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
						
					</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
						/>
						<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
						Remember me
						</label>
					</div>

					<div className="text-sm">
						<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
						Forgot your password?
						</a>
					</div>
				</div>
					<button className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						<span className="absolute inset-y-0 left-0 flex items-center pl-3">
							<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
						</span>
						Sign in!
					</button>
					{error && (
						<div className='form__error-container'>
							<span className='form__error-text'>{error.message}</span>
						</div>
					)}
					{notification && (
						<div className='form__notification-container'>
							<span className='form__notification-text'>
								{notification}
							</span>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
