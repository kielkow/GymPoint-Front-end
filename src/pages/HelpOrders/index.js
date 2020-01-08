import React from 'react';

import { Container, Content } from './styles';

export default function Students() {
  return (
    <Container>
      <header>
        <strong>Help Orders</strong>
      </header>
      <Content>
        <header>
          <span>STUDENT</span>
          <span />
        </header>
        <ul>
          <li>
            <span>Matheus Kielkowski</span>
            <div>
              <button id="answer" type="button">
                answer
              </button>
            </div>
          </li>
          <li>
            <span>Matheus Kielkowski</span>
            <div>
              <button id="answer" type="button">
                answer
              </button>
            </div>
          </li>
          <li>
            <span>Matheus Kielkowski</span>
            <div>
              <button id="answer" type="button">
                answer
              </button>
            </div>
          </li>
          <li>
            <span>Matheus Kielkowski</span>
            <div>
              <button id="answer" type="button">
                answer
              </button>
            </div>
          </li>
          <li>
            <span>Matheus Kielkowski</span>
            <div>
              <button id="answer" type="button">
                answer
              </button>
            </div>
          </li>
        </ul>
      </Content>
    </Container>
  );
}
