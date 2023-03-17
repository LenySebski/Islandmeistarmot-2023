import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
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
		<div className='flex flex-col justify-center'>
			<h2 className='text-extrabold text-3xl '>Sign In!</h2>
			<h3 className='text-lg text-gray-200'>
				And start reuniting cats and their owners today!
			</h3>
			<form onSubmit={handleSubmit} className='flex flex-col'>
				<label className='form__label'>Username</label>
				<input
					className='rounded bg-white shadow-lg p-2'
					type='text'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label className='text-lg'>Password</label>
				<input
					className='rounded bg-white shadow-lg p-2'
					type='password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='btn'>Sign in!</button>
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
	);
};

export default LoginForm;
