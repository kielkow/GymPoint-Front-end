import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
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
        background: #50d250;
        color: #fff;
        padding: 5px 10px;
        border: 0;
        font-weight: bold;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &:hover {
          background: ${darken(0.05, '#50d250')};
        }

        span {
          margin-top: 3px;
        }
      }

      a {
        background: #ee4d63;
        color: #fff;
        margin-right: 20px;
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
    }
  }
`;

export const Content = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 20px;

  div {
    display: flex;
    flex-direction: column;
    flex: 1;

    span {
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      padding: 10px 10px;
      border-radius: 4px;
      border: 0.5px solid #eee;
    }

    & + div {
      margin-top: 20px;
    }
  }

  .paternDiv {
    display: flex;
    flex-direction: row;

    .childDiv {
      margin-top: 0;
      & + div {
        margin-left: 10px;
      }
    }
  }
`;
