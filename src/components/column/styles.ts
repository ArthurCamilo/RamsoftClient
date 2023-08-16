/* eslint-disable import/no-anonymous-default-export */
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

export const Container = styled.div`
    background-color: #f1f2f4;
    width: 250px;
    margin: 0 10px;
    border-radius: 6px;
    padding: 10px;
    overflow-y: scroll;
    position: relative;
`;

export const Title = styled.label`
    padding: 10px;
    font-weight: bold;
    color: #005c91;
`;

export const AddButton = styled.button`
    background: #fff;
    text-align: center;
    border-radius: 12px;
    width: 100%;
    border: none;
    padding: 10px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
`

export const LoadingGauge = styled(CircularProgress)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
`