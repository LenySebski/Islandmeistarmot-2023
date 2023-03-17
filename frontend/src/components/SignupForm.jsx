import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState(null);
	const context = useContext(UserContext);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = { username, password, email, phone, name };
		const res = await fetch(`${import.meta.env.VITE_URL_BASE}/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		});
		const data = await res.json();
		console.log(data);
		if (data.error) {
			setError(data.error.errors);
		} else {
			context.setUser({ user: data.user, token: data.token });
			setNotification("Signup successful! Redirecting to home page...");

			setTimeout(() => {
				navigate("/");
			}, 1500);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
			<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        		<div className="space-y-6 sm:space-y-5">
          			<div>
					  <h3 className="text-base font-semibold leading-6 text-gray-900">Sign Up!</h3>
					  <p className="mt-1 max-w-2xl text-sm text-gray-500">Share your food, share your love</p>
					</div>

					<div className="space-y-6 sm:space-y-5">
        		    	<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>Name</label>
								<input
									className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									type='text'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
						</div>
					</div>

					<div className="space-y-6 sm:space-y-5">
        		    	<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>Username*</label>
								<input
									className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									type='text'
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
						</div>
					</div>

					<div className="space-y-6 sm:space-y-5">
        		    	<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>Password*</label>
								<input
									className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									type='password'
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
						</div>
					</div>

					<div className="space-y-6 sm:space-y-5">
        		    	<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>E-mail</label>
								<input
									className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
						</div>
					</div>

					<div className="space-y-6 sm:space-y-5">
        		    	<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'>Phone</label>
								<input
									className='block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
									type='tel'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
						</div>
					</div>


					<div className="pt-5">
        				<div className="flex justify-end gap-x-3">
							<button className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
								Sign up!
							</button>
						</div>
					</div>
					{error && (
						<div className='form__error-container'>
							{error.map((err) => (
								<span className='form__error-text'>{err.msg}</span>
							))}
						</div>
					)}
					{notification && (
						<div className='form__notification-container'>
							<span className='form__notification-text'>
								{notification}
							</span>
						</div>
					)}
					</div>
				</div>
		</form>
	);
};
