import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import { ButtonSection, CardId, EditInput, ModalContainer } from "./styles";
import { createCard, updateCard, deleteCard } from "../../requesters/requester";
import { ICard } from "../../types";

export interface CardModalProps {
  card?: ICard;
  isNew?: Boolean;
  handleClose: () => void;
  handleCreateCard?: (card: ICard) => void;
  handleUpdateCard?: (card: ICard) => void;
  handleDeleteCard?: (cardId: Number) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  card = { id: 0, name: "", index: 0, columnId: 0 },
  isNew = false,
  handleClose,
  handleCreateCard = () => {},
  handleUpdateCard = () => {},
  handleDeleteCard = () => {},
}) => {
  const [cardName, setCardName] = useState(card.name);

  const handleSaveCardAction = async () => {
    if (isNew) {
      const createdCard = (
        await createCard({
          cardName,
          columnId: card.columnId,
        })
      ).data;
      handleCreateCard(createdCard);
    } else {
      const updatedCard = (await updateCard({ cardId: card.id, cardName }))
        .data;
      handleUpdateCard(updatedCard);
    }
  };

  const handleDeleteCardAction = async () => {
    await deleteCard(card.id);
    handleDeleteCard(card.id);
  };

  return (
    <Modal open onClose={() => handleClose()}>
      <ModalContainer>
        <CardId>#{card.id}</CardId>
        <EditInput
          value={cardName}
          onChange={(value) => setCardName(value.target.value)}
        />
        <ButtonSection>
          {!isNew && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteCardAction}
            >
              Delete
            </Button>
          )}
          <Button
            variant="contained"
            color="success"
            onClick={handleSaveCardAction}
          >
            Save
          </Button>
        </ButtonSection>
      </ModalContainer>
    </Modal>
  );
};
