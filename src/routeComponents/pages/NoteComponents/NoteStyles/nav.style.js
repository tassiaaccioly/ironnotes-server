import style from "styled-components";

export const Nav = style.div`
    color: white;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: ${({ theme }) => theme.navColor};
    width: 15%;
    color: ${({ theme }) => theme.navText};
    display: flex;
    flex-direction: column;
    align-items: center;
    transition:  1s;
    @media(max-width: 767px) {
        width: 100%;
        z-index: 2;
        right: -100%;
    }
    
    `;
export const SearchBar = style.input`
    margin: 30px 0 10px;
    border-radius: 5px;
    border: 1px solid #2a2e2f;
    height: 30px;
    width: 80%;
    font-size: 15px;
    text-align: center;
    :focus{
        border: none;
        outline: 0;
    }
`;

export const PullNavMobile = style.button`
   display: none;
    @media(max-width: 767px) {
        color: white;
        font-weight: bold;
        border: none;
        height: 30px;
        width: 90px;
        background: #0098b6;
        transform: rotate(270deg);
        z-index: 40;
        left: -6%;
        display: inline;
        margin-top: 20%;
        position:fixed;
        font-size: 18px;
    }
`;

export const Logo = style.img`
    height: auto;
    width: clamp(80px, 11vw, 150px);
    margin-top: 20px;
`;

export const ListNavTitle = style.div`
    color: white;
    margin-top: 10px;
    font-size: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    color: ${({ theme }) => theme.navText};
    margin-bottom: 10px;
    overflow: hidden;
    :hover{
        font-weight: bold;
        border-bottom: 1.2px solid ${({ theme }) => theme.navText};
    }
`;

// border-bottom: 1px solid ${({ theme }) => theme.navText};

export const ListItems = style.div`
    max-width: 80%;
    overflow: scroll;
    width: 100%;
    color: ${({ theme }) => theme.navText};
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 20px;
    ::-webkit-scrollbar{
        width: 2px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.navText}; 
    }
`;

export const NavOptions = style.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 1%;
    width: 70%;
    margin-bottom: 10px;
`;

export const Options = style.div`
    margin: 10px;
    position: fixed;
    bottom: 20px;
    background: ${({ theme }) => theme.ButtonTheme};
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    width: 110px;
    text-align: center;
    font-weight: bold;
    :hover{
        background: #fafbfb;
        box-shadow: 1px 1px 5px black;
        }
    `;
// box-shadow: 1px 1px 5px black;

export const DarkM = style.img`
height: 20px;
width: 20px;
`;

export const NavRight = style.nav`
    position: fixed;
    z-index: 180; 
    right: 2%;
    top:3%;
    transition: 1s;
    background: ${({ theme }) => theme.navColor};
    border-radius: 5px;
    display: flex;
`;
export const IconRight = style.img`
    height: 33px;
    width: auto;
    margin: 7px;
    padding: 3px;
    border-radius: 5px;
    cursor: pointer;
    :hover{
    background: rgba(51,216,255,1);
    }
`;

// background: white;
// box-shadow: 1px 1px 1px black;

export const IconListArrow = style.img`
    height: 20px;
    width: 20px;
`;
