import Button from "react-bootstrap/Button";

interface PaginationProps {
	className?: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	onNextPage: () => void;
	onPreviousPage: () => void;
	page: number;
	totalPages: number;
}

const Pagination = ({
	className = "",
	hasNextPage,
	hasPreviousPage,
	onNextPage,
	onPreviousPage,
	page,
	totalPages,
}: PaginationProps) => {
	return (
		<div className={"d-flex justify-content-between align-items-center " + className}>
			<div className="prev">
				<Button
					disabled={!hasPreviousPage}
					onClick={onPreviousPage}
					variant="primary"
				>Previous Page</Button>
			</div>

			<div className="page">{page} / {totalPages}</div>

			<div className="next">
				<Button
					disabled={!hasNextPage}
					onClick={onNextPage}
					variant="primary"
				>Next Page</Button>
			</div>
		</div>
	)
}

export default Pagination;
