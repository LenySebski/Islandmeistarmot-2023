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
		<div className='form__wrapper'>
			<h2 className='form__header'>Sign up!</h2>
			<h3 className='form__subheader'>
				And start reuniting cats and their owners today!
			</h3>

			<form onSubmit={handleSubmit} className='form__container'>
				<label className='form__label'>Username*</label>
				<input
					className='form__input'
					type='text'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label className='form__label'>Password*</label>
				<input
					className='form__input'
					type='password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label className='form__label'>Email</label>
				<input
					className='form__input'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label className='form__label'>Phone</label>
				<input
					className='form__input'
					type='tel'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<label className='form__label'>Name</label>
				<input
					className='form__input'
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button className='form__btn--primary'>Sign up!</button>
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
			</form>
		</div>
	);
};
