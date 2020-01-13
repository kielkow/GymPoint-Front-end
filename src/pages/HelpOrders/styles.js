import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
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
        #answer {
          color: #4d85ee;
        }
        button {
          border: 0;
          background: none;
          & + button {
            margin-left: 20px;
          }
        }
      }
    }
    li > span:first-child {
      width: 90%;
    }
    li > div {
      width: 0%;
    }
  }

  header > span:first-child {
    width: 30%;
  }
  header > div {
    width: 0%;
  }
`;

export const Pagination = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

export const Previous = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.page === 1 || props.loadingNext,
}))`
  background: #ee4d63;
  color: #eee;
  font-style: bold;
  & + button {
    margin-left: 10px;
  }
  font-size: 17px;
  float: center;
  display: flex;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    background: ${darken(0.05, '#ee4d63')};
  }
`;

export const Next = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.loadingNext || props.finalPage,
}))`
  background: #ee4d63;
  color: #eee;
  font-style: bold;
  & + button {
    margin-left: 10px;
  }
  font-size: 17px;
  float: center;
  display: flex;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover {
    background: ${darken(0.05, '#ee4d63')};
  }
`;
