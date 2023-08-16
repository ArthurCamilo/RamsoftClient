export interface ICard {
    id: number;
    name: string;
    index: number;
    columnId: number;
}

export interface IColumn {
    id: number;
    name: string;
    cards: ICard[];
}

export interface CreateCardDTO {
    cardName: string;
    columnId: number;
}

export interface MoveCardDTO {
    cardId: number;
    previousColumnId: number;
    previousIndex: number;
    newColumnId: number;
    newIndex: number;
}

export interface UpdateCardDTO {
    cardId: number;
    cardName: string;
}