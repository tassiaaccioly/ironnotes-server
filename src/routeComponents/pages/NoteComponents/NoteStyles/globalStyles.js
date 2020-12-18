import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    .wmde-markdown{
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size: clamp(18px, 10vw, 1.5rem);
            text-align: justify;
            margin-bottom: 6%;
            margin-top: 4%;
        @media(max-width: 767px) {
            font-size: 18px;
            margin-top: 10px;
            text-align: justify;
        }
    }
    .w-md-editor{
        width: 100%;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size: clamp(18px, 10vw, 1.5rem);
    }
    body{
        margin: 0;
        padding: 0;
    }
    #root{
        maegin: 0;
        padding: 0;
        background: ${({theme})=>theme.body};
        transition: 1s;
    }
`;