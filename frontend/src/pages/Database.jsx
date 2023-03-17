import { PostList } from "../components/PostList";
import { RandomPhrase } from "../components/RandomPhrase";
export const DatabasePage = () => {
	return (
		<div className='layout__wrapper--columns'>
			<div className='layout__filler--columns'>
				<div className='overlay'></div>
				<div className='overlay__text'>
					<RandomPhrase />
				</div>
			</div>
			<div className='layout__content--columns'>
				<PostList />
			</div>
		</div>
	);
};
