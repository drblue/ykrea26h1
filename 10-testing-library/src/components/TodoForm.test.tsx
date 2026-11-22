import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import TodoForm from "./TodoForm";

test("enables saving when the title becomes valid", async () => {
	const user = userEvent.setup();
	const onSave = vi.fn();

	// ARRANGE
	render(<TodoForm onSave={onSave} />);

	const title = screen.getByRole("textbox", { name: /title/i });
	const save = screen.getByRole("button", { name: /save/i });

	// ACT
	await user.type(title, "ab");

	// ASSERT
	expect(title).toHaveValue("ab");
	expect(screen.getByText(/too short/i)).toBeVisible();
	expect(save).toBeDisabled();

	// ACT
	await user.type(title, "c");
	expect(screen.queryByText(/too short/i)).not.toBeInTheDocument();
	expect(save).toBeEnabled();
});

test("saves the trimmed title and clear the field when creating a todo", async () => {
	const user = userEvent.setup();
	const onSave = vi.fn().mockResolvedValue({
		id: 1,
		title: "Learn React",
		completed: false,
	});

	// ARRANGE
	render(<TodoForm onSave={onSave} />);

	const title = screen.getByRole("textbox", { name: /title/i });
	const save = screen.getByRole("button", { name: /save/i });

	// ACT
	await user.type(title, "  Learn React  ");
	await user.click(save);

	expect(onSave).toHaveBeenCalledExactlyOnceWith("Learn React");

	await waitFor(() => {
		expect(title).toHaveValue("");
	});
});
