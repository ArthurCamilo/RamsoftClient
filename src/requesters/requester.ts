import axios, { AxiosResponse } from "axios";
import { CreateCardDTO, ICard, IColumn, MoveCardDTO, UpdateCardDTO } from "../types";

const BASE_URI = "http://localhost:5041/api/board";

export const getColumns = async (): Promise<AxiosResponse<IColumn[]>> => {
    return axios.get(`${BASE_URI}/columns`)
};

export const createCard = async (dto: CreateCardDTO): Promise<AxiosResponse<ICard>> => {
    return axios.post(`${BASE_URI}/card`, dto)
};

export const updateCard = async (dto: UpdateCardDTO): Promise<AxiosResponse<ICard>> => {
    return axios.put(`${BASE_URI}/card`, dto)
};

export const moveCard = async (dto: MoveCardDTO) => {
    return axios.put(`${BASE_URI}/move-card`, dto)
};

export const deleteCard = async (cardId: Number) => {
    return axios.delete(`${BASE_URI}/card?cardId=${cardId}`)
};
