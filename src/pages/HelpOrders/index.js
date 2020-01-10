/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Container, Content } from './styles';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '0',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3),
    borderRadius: '4px',
  },
}));

export default function Students() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [btnColor, setBtnColor] = React.useState('#ee4d63');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeBtnColorOver = () => {
    setBtnColor('#dc465a');
  };

  const changeBtnColorOut = () => {
    setBtnColor('#ee4d63');
  };

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
              <button id="answer" type="button" onClick={handleOpen}>
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div>
              <span style={{ fontWeight: 'bold' }}>QUESTION STUDENT</span>
              <p
                style={{
                  marginTop: '10px',
                  color: '#796b6bee',
                  wordSpacing: '5px',
                  lineHeight: '20px',
                }}
              >
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem? It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem?
              </p>
            </div>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                height: '200px',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>ANSWER</span>
              <textarea
                placeholder=" Your answer..."
                style={{
                  fontSize: '14px',
                  padding: '5px 0px',
                  borderRadius: '2px',
                  border: '0.5px solid #eee',
                  margin: '10px 0px',
                  flex: '1',
                  resize: 'none',
                  overflow: 'hidden',
                }}
              />
            </div>
            <button
              type="button"
              style={{
                background: btnColor,
                color: '#fff',
                padding: '10px 10px',
                border: '0',
                fontWeight: 'bold',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseOver={changeBtnColorOver}
              onMouseOut={changeBtnColorOut}
            >
              Answer Student
            </button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}
