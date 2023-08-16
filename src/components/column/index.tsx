import React, { useState } from "react";
import { AddButton, Container, Title } from "./styles";
import { Card } from "../card";
import { Droppable } from "@hello-pangea/dnd";
import { CardModal } from "../modal";
import { ICard, IColumn } from "../../types";

export interface ColumnProps {
  column: IColumn;
  handleCreateCard: (card: ICard) => void;
  handleUpdateCard: (card: ICard) => void;
  handleDeleteCard: (cardId: Number) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  handleCreateCard,
  handleUpdateCard,
  handleDeleteCard,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCardAction = (card: ICard) => {
    handleCreateCard(card);
    setIsModalOpen(false);
  };

  const handleDeleteCardAction = (cardId: Number) => {
    handleDeleteCard(cardId);
    setIsModalOpen(false);
  };

  const handleUpdateCardAction = (updatedCard: ICard) => {
    handleUpdateCard(updatedCard);
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <Title>{column.name}</Title>
        <Droppable droppableId={`${column.id}`}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {column.cards.map((card) => (
                <Card
                  card={card}
                  handleDeleteCard={handleDeleteCardAction}
                  handleUpdateCard={handleUpdateCardAction}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AddButton onClick={() => setIsModalOpen(true)}>Adicionar</AddButton>
      </Container>
      {isModalOpen && (
        <CardModal
          isNew
          handleClose={() => setIsModalOpen(false)}
          handleCreateCard={handleCreateCardAction}
        />
      )}
    </>
  );
};
