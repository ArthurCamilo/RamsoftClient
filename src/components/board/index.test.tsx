/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { Board } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

jest.unmock("axios");

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

const mockColumns = [
  {
    id: 1,
    name: "Column 1",
    cards: [{ id: 1, name: "Card 1", index: 0, columnId: 1 }],
  },
  {
    id: 2,
    name: "Column 2",
    cards: [{ id: 2, name: "Card 2", index: 0, columnId: 2 }],
  },
];

describe("Board Component", () => {
  const queryClient = new QueryClient();

  it("renders columns and cards", () => {
    const mock = new MockAdapter(axios);
    mock.onGet("/api/board/columns").reply(200, { mockColumns });

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>
    );

    const column1 = getByText("Column 1");
    const column2 = getByText("Column 2");
    const card1 = getByText("Card 1");
    const card2 = getByText("Card 2");

    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });
});
