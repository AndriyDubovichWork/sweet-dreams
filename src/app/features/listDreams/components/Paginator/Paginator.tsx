import React from "react";
import { usePaginatorStore } from "@/app/common/hooks/usePaginatorStore";
import useStylesProvider from "@/app/common/hooks/useStylesProvider";

const Paginator = () => {
	const {
		pageNumber,
		totalItems,
		canMoveForward,
		canMoveBackward,
		moveForward,
		moveBackward,
		setPage,
		visiblePages,
	} = usePaginatorStore();

	const { paginator } = useStylesProvider();
	if (totalItems > 10)
		return (
			<div style={paginator.container}>
				<button
					type="button"
					onClick={moveBackward}
					disabled={!canMoveBackward()}
					style={{
						...paginator.navButton,
						...(!canMoveBackward() ? paginator.navButton["&:disabled"] : {}),
					}}
					aria-label="Previous page"
				>
					Previous
				</button>

				<div style={paginator.pagesContainer}>
					{visiblePages().map((page, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <id is ok>
						<React.Fragment key={index}>
							{page === -1 ? (
								<span style={paginator.ellipsis}>...</span>
							) : (
								<button
									type="button"
									onClick={() => setPage(page)}
									style={{
										...paginator.pageButton,
										...(page === pageNumber
											? paginator.pageButton["&.active"]
											: {}),
									}}
									aria-label={`Page ${page}`}
									aria-current={page === pageNumber ? "page" : undefined}
								>
									{page}
								</button>
							)}
						</React.Fragment>
					))}
				</div>

				<button
					type="button"
					onClick={moveForward}
					disabled={!canMoveForward()}
					style={{
						...paginator.navButton,
						...(!canMoveForward() ? paginator.navButton["&:disabled"] : {}),
					}}
					aria-label="Next page"
				>
					Next
				</button>
			</div>
		);
};

export default Paginator;
