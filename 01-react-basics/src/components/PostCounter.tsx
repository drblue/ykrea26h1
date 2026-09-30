interface PostCounterProps {
	count: number;
}

const PostCounter = ({ count }: PostCounterProps) => {
	return (
		<p>There are {count} {count === 1 ? "post" : "posts"}.</p>
	)
}

export default PostCounter;
