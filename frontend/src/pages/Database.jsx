import { PostList } from "../components/PostList";
export const DatabasePage = () => {
	return (
		<div className='layout__wrapper--columns'>
			<div className='layout__content--columns'>
				<PostList />
			</div>
		</div>
	);
};
