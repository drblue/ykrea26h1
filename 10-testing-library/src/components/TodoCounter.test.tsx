import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import TodoCounter from "./TodoCounter";

test("shows the count when there are no todos", () => {
	render(<TodoCounter completed={0} total={0} />);

	expect(screen.getByText("0 of 0 todos completed.")).toBeVisible();
});
