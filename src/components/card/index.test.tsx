/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Card } from ".";
import { Droppable } from "@hello-pangea/dnd";

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

describe("Card Component", () => {
  const mockCard = {
    id: 1,
    index: 0,
    columnId: 0,
    name: "Test Card",
  };

  const mockHandlers = {
    handleDeleteCard: jest.fn(),
    handleUpdateCard: jest.fn(),
  };

  it("renders card correctly", () => {
    const { getByText } = render(<Card card={mockCard} {...mockHandlers} />);

    const cardNameElement = getByText("Test Card");
    expect(cardNameElement).toBeInTheDocument();
  });

  it("opens modal on card click", () => {
    const { getByText } = render(<Card card={mockCard} {...mockHandlers} />);

    const cardElement = getByText("Test Card");
    fireEvent.click(cardElement);

    const modalElement = screen.getByRole("presentation");
    expect(modalElement).toBeInTheDocument();
  });
});
