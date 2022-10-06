import styled, { createGlobalStyle } from 'styled-components';
import myBackground from './images/chalkboard.jpg'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background: url(${myBackground});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif; 
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    line-items: center;

    > p {
        color: #fff;
    }

    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: 'Special Elite', cursive;
        color: #346B31; 
        font-size: 70px;
        text-align: center;
        margin: 20px;
    }

    .start, .next, .changeLevel {
        cursor: pointer;
        background: linear-gradient(180deg, #fff, #346B31);
        border: 2px solid #346B31;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 20px 0;
        padding: 0 40px;    
    }

    .start, .changeLevel {
        max-width: 200px;
    }
`