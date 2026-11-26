import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, expect, test, vi } from "vitest";
import * as TodoAPI from "../../services/TodoAPI";
import CreateTodoPage from "../CreateTodoPage";

const TODO_TITLE = "Learn React";

afterEach(() => {
	vi.restoreAllMocks();
});

test("shows an error and keeps the title when saving fails", async () => {
	const user = userEvent.setup();
	const queryClient = new QueryClient();

	vi.spyOn(TodoAPI, "createTodo")
		.mockRejectedValueOnce(new Error("Save failed"));

	render(
		<QueryClientProvider client={queryClient}>
			<MemoryRouter>
				<CreateTodoPage />
			</MemoryRouter>
		</QueryClientProvider>
	);

	const title = screen.getByRole("textbox", { name: /title/i });
	const save = screen.getByRole("button", { name: /save/i });

	await user.type(title, TODO_TITLE);
	await user.click(save);

	expect(await screen.findByText("Save failed")).toBeVisible();
	await waitFor(() => expect(save).toBeEnabled());
	expect(title).toHaveValue(TODO_TITLE);
});
