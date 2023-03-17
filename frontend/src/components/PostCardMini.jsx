import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useMutation, useQueryClient } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import placeholderImage from "../assets/placeholder.svg";

export const PostCardMini = ({ post }) => {
	const { user } = useContext(UserContext);
	const { postedById, district, imageURL, status } = post;
	const queryClient = useQueryClient();

	const { mutate: deletePost } = useMutation(
		() =>
			fetch(`${import.meta.env.VITE_URL_BASE}/api/post/${post.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.token}`,
				},
			}),
		{
			onSuccess: () => {
				console.log("deleted");
				queryClient.invalidateQueries("posts");
			},
			onError: (error) => {
				console.log("error", error);
			},
		}
	);

	return (
		<div className='post__card'>
			<div className='post__image-container'>
				<img
					className='post__image-placeholder'
					src={placeholderImage}
					alt='CATalog logo'
				/>
				<div className='post__overlay'></div>
				<div className='post__overlay-text'>
					<h3>
						{status === "FOUND" ? (
							<span className='post__overlay-text--found'>Found </span>
						) : (
							<span className='post__overlay-text--lost'>Lost </span>
						)}
						in {district}
					</h3>
				</div>
				<img className='post__image' src={imageURL} alt='post' />
			</div>

			<div className='post__button-container'>
				{(user?.user.id === postedById || user?.user.role === "ADMIN") && (
					<button
						className='post__button post__button-edit'
						disabled
						onClick={deletePost}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				)}
				{(user?.user.id === postedById || user?.user.role === "ADMIN") && (
					<button
						className='post__button post__button-delete'
						onClick={deletePost}
					>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				)}
			</div>
		</div>
	);
};
