import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;
    min-height: 100vh;
    align-items: center;
    text-align: center;
    justify-content: center;
    & button {
        background: rgba(51, 51, 255, 1) !important;
    }
`;

export const Header = styled.h4`
    text-transform: capitalize;
    letter-spacing: 1px;
    font-weight: bold;
    text-align: center;
`;
export const Input = styled.input`
    width: 100%;
    border: 1px solid #f2f2f2;
    padding: 10px;
    margin-bottom: 10px;
`;

export const MainLogo = styled.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 50px;
    padding-top: 50px;
`;

export const H1 = styled.h1`
    text-align: center;
    padding-bottom: 20px;
`;

export const H2 = styled.h2`
    text-align: center;
    padding-bottom: 20px;
`;

export const ErrorText = styled.p`
    color: red;
    padding-top: 5px;
    padding-bottom: 0px;
`;
