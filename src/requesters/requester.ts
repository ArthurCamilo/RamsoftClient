import axios, { AxiosResponse } from "axios";
import { ICard, IColumn } from "../types";

const BASE_URI = "http://localhost:5041/api/board";

export const getColumns = async (): Promise<AxiosResponse<IColumn[]>> => {
    return axios.get(`${BASE_URI}/columns`)
};

export const getColumnCards = async (columnId: Number): Promise<AxiosResponse<ICard[]>> => {
    return axios.get(`${BASE_URI}/column-cards?columnId=${columnId}`)
};

export const createCard = async (card: ICard): Promise<AxiosResponse<ICard>> => {
    return axios.post(`${BASE_URI}/card`, { card })
};

export const updateCard = async (card: ICard): Promise<AxiosResponse<ICard>> => {
    return axios.put(`${BASE_URI}/card`, { card })
};

export const moveCard = async (card: ICard, previousColumnId: Number, previousIndex: Number) => {
    return axios.put(`${BASE_URI}/move-card`, { card, previousColumnId, previousIndex })
};

export const deleteCard = async (cardId: Number) => {
    return axios.delete(`${BASE_URI}/card?cardId=${cardId}`)
};
