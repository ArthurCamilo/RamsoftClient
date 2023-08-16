import React, { useState } from "react";
import { MuiCard } from "./styles";
import CardContent from "@mui/material/CardContent";
import { Draggable } from "@hello-pangea/dnd";
import { CardModal } from "../modal";
import { ICard } from "../../types";

export interface CardProps {
  card: ICard;
  handleDeleteCard: (cardId: Number) => void;
  handleUpdateCard: (card: ICard) => void;
}

export const Card: React.FC<CardProps> = ({
  card,
  handleDeleteCard,
  handleUpdateCard,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteCardAction = () => {
    setIsModalOpen(false);
    handleDeleteCard(card.id);
  };

  const handleUpdateCardAction = (updatedCard: ICard) => {
    setIsModalOpen(false);
    handleUpdateCard(updatedCard);
  };

  return (
    <>
      <Draggable draggableId={`${card.id}`} index={card.index}>
        {(provided, snapshot) => (
          <MuiCard
            {...provided.draggableProps}
            ref={provided.innerRef}
            onClick={() => setIsModalOpen(true)}
            draggable
          >
            <CardContent {...provided.dragHandleProps}>{card.name}</CardContent>
          </MuiCard>
        )}
      </Draggable>
      {isModalOpen && (
        <CardModal
          card={card}
          handleClose={() => setIsModalOpen(false)}
          handleDeleteCard={handleDeleteCardAction}
          handleUpdateCard={handleUpdateCardAction}
        />
      )}
    </>
  );
};
