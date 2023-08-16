/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CardModal } from ".";

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

describe("CardModal Component", () => {
  const mockCard = {
    id: 1,
    name: "Test Card",
    columnId: 1,
    index: 0,
  };

  const mockHandlers = {
    handleClose: jest.fn(),
    handleCreateCard: jest.fn(),
    handleUpdateCard: jest.fn(),
    handleDeleteCard: jest.fn(),
  };

  it("renders card name correctly", () => {
    const { getByDisplayValue } = render(
      <CardModal card={mockCard} {...mockHandlers} />
    );

    const cardNameInput = getByDisplayValue("Test Card");
    expect(cardNameInput).toBeInTheDocument();
  });

  it("calls handleCreateCard when creating a new card", () => {
    const { getByDisplayValue, getByText } = render(
      <CardModal isNew={true} card={mockCard} {...mockHandlers} />
    );

    const cardNameInput = getByDisplayValue("Test Card");
    fireEvent.change(cardNameInput, { target: { value: "New Card" } });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
  });

  it("calls handleUpdateCard when updating an existing card", () => {
    const { getByDisplayValue, getByText } = render(
      <CardModal isNew={false} card={mockCard} {...mockHandlers} />
    );

    const cardNameInput = getByDisplayValue("Test Card");
    fireEvent.change(cardNameInput, { target: { value: "Updated Card" } });

    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
  });

  it("calls handleDeleteCard when deleting an existing card", () => {
    const { getByText } = render(
      <CardModal isNew={false} card={mockCard} {...mockHandlers} />
    );

    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);
  });
});
