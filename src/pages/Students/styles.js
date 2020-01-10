import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
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
      a {
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 10px;

  header {
    display: flex;
    justify-content: left;
    max-width: 1000px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: left;

    li {
      display: flex;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
      & + li {
        margin-top: 15px;
      }
      color: ${lighten(0.03, '#444444')};
      div {
        display: flex;
        #edit {
          color: #4d85ee;
        }
        #delete {
          color: #de3b3b;
        }
        button {
          border: 0;
          background: none;
          & + button {
            margin-left: 20px;
          }
        }
        a {
          border: 0;
          background: none;
          & + button {
            margin-left: 20px;
          }
        }
      }
    }
    li > span:first-child {
      width: 30%;
    }
    li > span:first-child + span {
      width: 31%;
    }
    li > span:first-child + span + span {
      width: 29%;
    }
    li > div {
      width: 0%;
    }
  }

  header > span:first-child {
    width: 30%;
  }
  header > span:first-child + span {
    width: 30.5%;
  }
  header > span:first-child + span + span {
    width: 30%;
  }
  header > div {
    width: 0%;
  }
`;
