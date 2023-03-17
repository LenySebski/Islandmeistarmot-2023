import { PostCardMini } from "./PostCardMini";
import { useQuery } from "react-query";
export const PostList = () => {
	const { isLoading, error, data } = useQuery("posts", () =>
		fetch(`${import.meta.env.VITE_URL_BASE}/posts`).then((res) => res.json())
	);

	return (
		<div className='h-[100vh] pt-20'>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error.message}</div>}
			{data &&
				data.map((post) => <PostCardMini key={post.id} post={post} />)}
		</div>
	);
};
