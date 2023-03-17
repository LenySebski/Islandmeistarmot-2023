import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const PostForm = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [content, setContent] = useState("");
	const [endTime, setEndTime] = useState("");
	const [district, setDistrict] = useState("");
	const [address, setAddress] = useState("");
	const [title, setTitle] = useState("");
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const post = { content, district, address, title, endTime };
		const res = await fetch(`${import.meta.env.VITE_URL_BASE}/api/post`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${user?.token}`,
			},
			body: JSON.stringify(post),
		});
		const data = await res.json();
		if (data.error) {
			setError(data.error);
			console.error(error);
		} else {
			setNotification("Posted successfuly! Redirecting to home page...");
			setTimeout(() => {
				navigate("/database");
			}, 2500);
		}
	};
	//form to create a post with optional content,district and image

	return (
		<form className='space-y-8 divide-y divide-gray-200 shadow-md p-10 '>
			<div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
				<div className='space-y-6 sm:space-y-5'>
					<div>
						<h3 className='text-3xl font-display  leading-6 text-emerald-800'>
							Sharing is caring
						</h3>
						<p className='mt-4 max-w-2xl text-sm text-gray-500'>
							We are excited to have you here and appreciate your
							interest in sharing your delicious food with others. By
							using our platform, you can connect with people in your
							community who are in need of a good meal. To get started,
							please fill out the following form with information about
							your food. This will help other users to find your
							offerings easily and make it easier for you to connect with
							people in need.
						</p>
					</div>

					<div className='space-y-6 sm:space-y-5'>
						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='title'
								className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
							>
								Post Header
							</label>
							<div className='mt-2 sm:col-span-2 sm:mt-0'>
								<div className='flex flex-col max-w-lg rounded-md shadow-sm'>
									<input
										type='text'
										name='title'
										id='title'
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
									<p className='text-xs text-gray-500 my-2'>
										Name of the Dish: Please provide a name for your
										dish. This could be anything from "Spicy Chicken
										Curry" to "Vegan Lentil Soup."
									</p>
								</div>
							</div>
						</div>

						<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
							<label
								htmlFor='content'
								className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
							>
								Post Content
							</label>
							<div className='mt-2 sm:col-span-2 sm:mt-0'>
								<textarea
									id='content'
									name='content'
									value={content}
									onChange={(e) => setContent(e.target.value)}
									rows={3}
									className='block w-full max-w-lg rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6'
								/>
								<ul>
									<li className='text-xs text-gray-500 my-2'>
										Ingredients: Please list all of the ingredients
										that you used to make your dish. This is important
										for people with allergies or dietary restrictions.
									</li>
									<li className='text-xs text-gray-500 my-2'>
										Quantity: How much of your dish are you offering?
										Please specify the number of servings or the
										weight of the food.
									</li>
								</ul>
								<p className='mt-2 text-sm text-gray-500'></p>
							</div>
						</div>
						<div className='space-y-6 pt-8 sm:space-y-5 sm:pt-10'>
							<div>
								<h3 className='text-base font-semibold leading-6 text-gray-900'>
									Pickup Details
								</h3>
								<p className='mt-1 max-w-2xl text-sm text-gray-500'>
									Where should people come to pick up your food? Please
									provide a specific location that is easy to find.
								</p>
							</div>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='address'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
								>
									Address
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<div className='flex max-w-lg rounded-md shadow-sm'>
										<input
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											type='text'
											name='address'
											id='address'
											className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										/>
									</div>
								</div>
							</div>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='district'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
								>
									Zip code
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<div className='flex max-w-lg rounded-md shadow-sm gap-2'>
										<input
											value={district}
											onChange={(e) => setDistrict(e.target.value)}
											type='text'
											name='district'
											id='district'
											placeholder='e.g. 101'
											className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										/>
									</div>
									<span className='text-gray-500 text-xs my-2'>
										We will use this data to sort your post by
										location in the future.
									</span>
								</div>
							</div>
							<div className='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
								<label
									htmlFor='endTime'
									className='block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5'
								>
									Available until
								</label>
								<div className='mt-2 sm:col-span-2 sm:mt-0'>
									<div className='flex max-w-lg rounded-md shadow-sm'>
										<input
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
											type='text'
											name='endTime'
											id='endTime'
											className='block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pt-5'>
				<div className='flex justify-end gap-x-3'>
					<button
						type='button'
						onClick={handleSubmit}
						className='rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Save
					</button>
				</div>
				<div className='text-gray-800 text-sm py-10'>
					By sharing your food with others, you are making a positive
					impact on your community.{" "}
					<span className='font-bold text-lg'>Thank you</span> for using
					our app to help reduce food waste and connect people in need with
					nutritious meals.
				</div>
			</div>
		</form>
	);
};
