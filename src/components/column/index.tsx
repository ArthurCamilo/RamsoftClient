import React, { useEffect, useState } from "react";
import { AddButton, Container, LoadingGauge, Title } from "./styles";
import { Card } from "../card";
import { Droppable } from "@hello-pangea/dnd";
import { CardModal } from "../modal";
import { IColumn } from "../../types";
import { getColumnCards } from "../../requesters/requester";
import { useQuery } from "react-query";

export interface ColumnProps {
  column: IColumn;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, status, refetch } = useQuery(
    ["get-column-cards", column.id],
    () => getColumnCards(column.id)
  );

  useEffect(() => {}, [data]);

  const handleClose = (hadAction: Boolean) => {
    if (hadAction) {
      refetch();
    }
    setIsModalOpen(true);
  };

  const handleReload = () => {
    refetch();
  };

  const renderContent = () => {
    if (status === "loading") {
      <LoadingGauge />;
    }

    if (status === "success") {
      return (
        <>
          <Droppable droppableId={`${column.id}`}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.data.map((card) => (
                  <Card card={card} handleReload={handleReload} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <AddButton onClick={() => setIsModalOpen(true)}>Adicionar</AddButton>
        </>
      );
    }
  };

  return (
    <>
      <Container>
        <Title>{column.name}</Title>
        {renderContent()}
      </Container>
      {isModalOpen && <CardModal isNew handleClose={handleClose} />}
    </>
  );
};
