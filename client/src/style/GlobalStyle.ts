import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import colors from 'constants/colors';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  button{
    margin:0;
    padding:0;
    border:none;
    background-color:inherit;
    border-radius: inherit;
    cursor:pointer;
  }
  input{
    border:none;
    border-radius:inherit;
    margin:0;
    padding:0;
    :focus-visible{
      outline:none;
    }
  }
  textarea{
    margin:0;
    padding:0;
    border:none;
    height:auto;
    max-width:100%;
    background-color:inherit;
    border-radius:inherit;
    color:inherit;
    :focus-visible{
      outline:none;
    }
  }
  a{
    color:inherit;
    text-decoration:none;
  }
  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  body {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
`;

export default GlobalStyle;
