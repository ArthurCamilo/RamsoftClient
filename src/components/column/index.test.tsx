/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Column } from ".";

jest.mock("@hello-pangea/dnd", () => ({
  Droppable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  Draggable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  DragDropContext: ({ children }: any) => children,
}));

describe("Column Component", () => {
  const mockColumn = {
    id: 1,
    name: "Test Column",
    cards: [
      { id: 1, name: "Card 1", index: 0, columnId: 1 },
      { id: 2, name: "Card 2", index: 1, columnId: 1 },
    ],
  };

  const mockHandlers = {
    handleCreateCard: jest.fn(),
    handleUpdateCard: jest.fn(),
    handleDeleteCard: jest.fn(),
  };

  it("renders column name correctly", () => {
    const { getByText } = render(
      <Column column={mockColumn} {...mockHandlers} />
    );

    const columnNameElement = getByText("Test Column");
    expect(columnNameElement).toBeInTheDocument();
  });

  it("opens modal on 'Add' button click", () => {
    const { getByText } = render(
      <Column column={mockColumn} {...mockHandlers} />
    );

    const addButton = getByText("Add");
    fireEvent.click(addButton);
  });

  it("renders cards inside the column", () => {
    const { getByText } = render(
      <Column column={mockColumn} {...mockHandlers} />
    );

    const card1Element = getByText("Card 1");
    const card2Element = getByText("Card 2");

    expect(card1Element).toBeInTheDocument();
    expect(card2Element).toBeInTheDocument();
  });
});
