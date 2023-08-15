import React from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { BoardContainer, LoadingGauge } from "./styles";
import { Column } from "../column";
import { useQuery } from "react-query";
import { getColumns } from "../../requesters/requester";

export const Board: React.FC<{}> = () => {
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {};

  const { data, status } = useQuery("get-columns", getColumns);

  const renderContent = () => {
    if (status === "loading") {
      return <LoadingGauge />;
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        {data?.data.map((column) => (
          <Column column={column} />
        ))}
      </DragDropContext>
    );
  };

  return <BoardContainer>{renderContent()}</BoardContainer>;
};
