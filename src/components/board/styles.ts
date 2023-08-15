import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

export const BoardContainer  = styled.div`
    height: calc(100vh - 20px);
    display: flex;
    background-color: rgb(0, 101, 255);
    padding: 10px;
`

export const LoadingGauge = styled(CircularProgress)`
`