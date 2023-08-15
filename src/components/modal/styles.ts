/* eslint-disable import/no-anonymous-default-export */
import styled from '@emotion/styled';

export const ButtonSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 40px;

    > button {
        margin-left: 10px;
    }
`;

export const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    width: 400px;
`

export const EditInput = styled.input`
    border-radius: 6px;
    border: none;
    background-color: #f1f2f4;
    padding: 10px;
    font-size: 18px;
`;

export const CardId = styled.span`
    font-size: 16px;
    margin-right: 10px;
    background-color: #f1f2f4;
    border-radius: 6px;
    padding: 10px;
`