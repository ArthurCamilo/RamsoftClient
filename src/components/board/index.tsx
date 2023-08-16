import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { BoardContainer, LoadingGauge } from "./styles";
import { Column } from "../column";
import { useQuery } from "react-query";
import { getColumns, moveCard } from "../../requesters/requester";
import { ICard, IColumn } from "../../types";

export const Board: React.FC<{}> = () => {
  const [columns, setColumns] = useState<IColumn[]>([]);

  const requestMoveCard = async (
    result: DropResult,
    destination: DraggableLocation
  ) => {
    const request = {
      cardId: parseInt(result.draggableId),
      previousColumnId: parseInt(result.source.droppableId),
      previousIndex: result.source.index,
      newColumnId: parseInt(destination.droppableId),
      newIndex: destination.index,
    };

    await moveCard(request);
  };

  const updateCardsIndex = (cards: ICard[]): ICard[] => {
    return cards.map((card, index) => {
      return { ...card, index: index };
    });
  };

  const updateColumnCards = (column: IColumn, cards: ICard[]): IColumn => {
    return { ...column, cards: updateCardsIndex(cards) };
  };

  const moveCardsWithinColumn = (
    destination: DraggableLocation,
    source: DraggableLocation
  ) => {
    const columnId = parseInt(source.droppableId);
    const column = columns.find((col) => col.id === columnId);

    if (column) {
      const newCards = Array.from(column.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      const newColumns = columns.map((col) =>
        col.id === columnId ? updateColumnCards(col, newCards) : col
      );

      setColumns(newColumns);
    }
  };

  const moveCardsBetweenColumns = (
    destination: DraggableLocation,
    source: DraggableLocation
  ) => {
    const sourceColumnId = parseInt(source.droppableId);
    const destinationColumnId = parseInt(destination.droppableId);

    const sourceColumn = columns.find((col) => col.id === sourceColumnId);
    const destinationColumn = columns.find(
      (col) => col.id === destinationColumnId
    );

    if (sourceColumn && destinationColumn) {
      const sourceCards = Array.from(sourceColumn.cards);
      const destinationCards = Array.from(destinationColumn.cards);
      const [movedCard] = sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, movedCard);

      const newColumns = columns.map((col) => {
        if (col.id === sourceColumnId) {
          return updateColumnCards(col, sourceCards);
        }
        if (col.id === destinationColumnId) {
          return updateColumnCards(col, destinationCards);
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

  const reorderCards = (
    destination: DraggableLocation,
    source: DraggableLocation
  ) => {
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      moveCardsWithinColumn(destination, source);
    } else {
      moveCardsBetweenColumns(destination, source);
    }
  };

  const onDragEnd = async (result: DropResult, provided: ResponderProvided) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    reorderCards(destination, source);
    requestMoveCard(result, destination);
  };

  const handleCreateCard = (newCard: ICard) => {
    const { columnId } = newCard;
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  const handleDeleteCard = (cardId: Number) => {
    const newColumns = columns.map((column) => {
      const newCards = column.cards.filter((card) => card.id !== cardId);
      return { ...column, cards: newCards };
    });

    setColumns(newColumns);
  };

  const handleUpdateCard = (updatedCard: ICard) => {
    const newColumns = columns.map((column) => {
      const newCards = column.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      return { ...column, cards: newCards };
    });

    setColumns(newColumns);
  };

  const { data, status } = useQuery("get-columns", getColumns);

  useEffect(() => {
    if (status === "success") {
      setColumns(data.data);
    }
  }, [data, status]);

  const renderContent = () => {
    if (status === "loading") {
      return <LoadingGauge size={"75px"} />;
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <Column
            column={column}
            handleCreateCard={handleCreateCard}
            handleDeleteCard={handleDeleteCard}
            handleUpdateCard={handleUpdateCard}
          />
        ))}
      </DragDropContext>
    );
  };

  return <BoardContainer>{renderContent()}</BoardContainer>;
};
