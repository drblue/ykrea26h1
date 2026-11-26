import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import TodoForm from "./TodoForm";
import type { Todo } from "../types/Todo.types";

const TODO_TITLE = "Learn React";

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
	await user.type(title, `  ${TODO_TITLE}  `);
	await user.click(save);

	expect(onSave).toHaveBeenCalledExactlyOnceWith(TODO_TITLE);

	await waitFor(() => {
		expect(title).toHaveValue("");
	});
});

test("keeps the title when saving fails", async () => {
	const user = userEvent.setup();
	const onSave = vi.fn().mockRejectedValue(new Error("Save failed"));

	// ARRANGE
	render(<TodoForm onSave={onSave} />);

	const title = screen.getByRole("textbox", { name: /title/i });
	const save = screen.getByRole("button", { name: /save/i });

	// ACT
	await user.type(title, TODO_TITLE);
	await user.click(save);

	// ASSERT
	expect(onSave).toHaveBeenCalledExactlyOnceWith(TODO_TITLE);

	await waitFor(() => {
		expect(save).toBeEnabled();
	});
	expect(title).toHaveValue(TODO_TITLE);
});

test("shows Saving and disables the button while saving", async () => {
	const user = userEvent.setup();
	let finishSaving!: (todo: Todo) => void;

	const pendingSave = new Promise<Todo>(resolve => {
		finishSaving = resolve;
	});
	const onSave = vi.fn().mockReturnValue(pendingSave);

	// ARRANGE
	render(<TodoForm onSave={onSave} />);

	const title = screen.getByRole("textbox", { name: /title/i });
	const save = screen.getByRole("button", { name: /save/i });

	// ACT
	await user.type(title, TODO_TITLE);
	await user.click(save);

	// ASSERT that button says "Saving" and is disabled
	expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();

	// Manually resolve the promise
	finishSaving({ id: 1, title: TODO_TITLE, completed: false });

	await waitFor(() => {
		expect(title).toHaveValue("");
	});
});

test("keeps the updated title after saving an edit", async () => {
	const user = userEvent.setup();
	const onSave = vi.fn().mockResolvedValue({
		id: 1,
		title: "Learn Vitest",
		completed: false,
	});

	render(<TodoForm initialTitle={TODO_TITLE} onSave={onSave} />);

	const title = screen.getByRole("textbox", { name: /title/i });
	const save = screen.getByRole("button", { name: /save/i });

	await user.clear(title);
	await user.type(title, "Learn Vitest");
	await user.click(save);

	expect(onSave).toHaveBeenCalledExactlyOnceWith("Learn Vitest");
	await waitFor(() => {
		expect(save).toBeEnabled();
	});
	expect(title).toHaveValue("Learn Vitest");
});
