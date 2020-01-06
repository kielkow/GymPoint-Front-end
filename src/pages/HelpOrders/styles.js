import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 600px;
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
  }
`;
