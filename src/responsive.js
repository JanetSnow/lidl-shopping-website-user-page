import { css } from "styled-components";

export const tablet = (props) => {
    return css`
      @media only screen and (max-width: 850px) {
        ${props}
      }
    `;
};
export const tabletMini = (props) => {
    return css`
      @media only screen and (max-width: 635px) {
        ${props}
      }
    `;
};

export const mobile = (props) => {
    return css`
      @media only screen and (max-width: 420px) {
        ${props}
      }
    `;
  };