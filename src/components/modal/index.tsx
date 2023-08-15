import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import { ButtonSection, CardId, EditInput, ModalContainer } from "./styles";
import { createCard, updateCard, deleteCard } from "../../requesters/requester";
import { ICard } from "../../types";

export interface CardModalProps {
  card?: ICard;
  isNew?: Boolean;
  handleClose: (hadAction: Boolean) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  card = { id: 0, name: "", index: 0 },
  isNew = false,
  handleClose,
}) => {
  const [cardName, setCardName] = useState(card.name);

  const handleSaveCard = async () => {
    const requestCard: ICard = { ...card, name: cardName };

    if (isNew) {
      await createCard(requestCard);
    } else {
      await updateCard(requestCard);
    }

    handleClose(true);
  };

  const handleDeleteCard = async () => {
    await deleteCard(card.id);
    handleClose(true);
  };

  return (
    <Modal open onClose={() => handleClose(false)}>
      <ModalContainer>
        <CardId>#{card.id}</CardId>
        <EditInput
          value={cardName}
          onChange={(value) => setCardName(value.target.value)}
        />
        <ButtonSection>
          {!isNew && (
            <Button variant="outlined" color="error" onClick={handleDeleteCard}>
              Delete
            </Button>
          )}
          <Button variant="contained" color="success" onClick={handleSaveCard}>
            Save
          </Button>
        </ButtonSection>
      </ModalContainer>
    </Modal>
  );
};
