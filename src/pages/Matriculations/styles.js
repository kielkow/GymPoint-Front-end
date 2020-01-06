import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  form {
    display: flex;
    justify-content: space-between;

    strong {
      font-size: 24px;
      color: ${lighten(0.03, '#444444')};
    }

    div {
      display: flex;
      justify-content: center;
      button {
        background: #ee4d63;
        color: #fff;
        padding: 5px 10px;
        border: 0;
        font-weight: bold;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background: ${darken(0.05, '#ee4d63')};
        }
      }
      input {
        width: 220px;
        margin-left: 15px;
        padding: 5px 10px;
        border-radius: 4px;
        border: 0;
      }
    }
  }
`;
