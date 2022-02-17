import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("List Component", () => {
  it("should render list items", async () => {
    const { getByText, queryByText, rerender, unmount } = render(
      <List initialItems={["Diego", "Elvis", "Chuck Norris"]} />
    );

    expect(getByText("Diego")).toBeInTheDocument();
    expect(getByText("Elvis")).toBeInTheDocument();
    expect(getByText("Chuck Norris")).toBeInTheDocument();

    unmount();
    rerender(<List initialItems={["Marylin"]} />);

    expect(getByText("Marylin")).toBeInTheDocument();
    expect(queryByText("Steven")).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("New item");
    const addButton = getByText("Add");

    userEvent.type(inputElement, "New");
    userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText("New")).toBeInTheDocument();
    });
  });

  it("should be able to add remove item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialItems={["Diego"]} />
    );

    const removeButtons = getAllByText("Remove");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Diego")).not.toBeInTheDocument();
    });
  });
});
