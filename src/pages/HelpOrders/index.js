/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { toast } from 'react-toastify';

import { Container, Content, Pagination, Previous, Next } from './styles';

import api from '~/services/api';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '500px',
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

  const [helporders, setHelpOrders] = useState([]);
  let [page, setPage] = useState(1);
  const [loadingNext, setLoadingNext] = useState(false);
  const [finalPage, setFinalPage] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState({ id: null, answer: '' });

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/students/help-orders', {
        params: {
          page,
        },
      });

      const { data } = response;

      setHelpOrders(data);

      const checkFinalPage = await api.get('/students/help-orders', {
        params: {
          page: page + 1,
        },
      });

      if (checkFinalPage.data.length === 0) {
        setLoadingNext(false);
        setFinalPage(true);
      } else {
        setLoadingNext(false);
        setFinalPage(false);
      }
    }

    loadHelpOrders();
  }, [page]);

  async function reloadHelpOrders() {
    const response = await api.get('/students/help-orders', {
      params: {
        page,
      },
    });

    const { data } = response;

    setHelpOrders(data);

    const checkFinalPage = await api.get('/students/help-orders', {
      params: {
        page: page + 1,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setLoadingNext(false);
      setFinalPage(true);
    } else {
      setLoadingNext(false);
      setFinalPage(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setQuestion('');

    const cleanAnswer = {
      id: null,
      answer: '',
    };
    setAnswer(cleanAnswer);
  };

  async function sendAnswer() {
    const answerText = { answer: answer.answer };
    try {
      await api.post(`/help-orders/${answer.id}/answer`, answerText);
      toast.success('Answer sended with success!');
      reloadHelpOrders();
      handleClose();
    } catch (err) {
      toast.error('Fail on send mensage');
      handleClose();
    }
  }

  function handleChangeAnswer(e) {
    const newAnswer = {
      id: answer.id,
      answer: e.target.value,
    };
    setAnswer(newAnswer);
  }

  function handleChangeAnswerId(helporderid) {
    const newAnswer = {
      id: helporderid,
      answer: answer.answer,
    };
    setAnswer(newAnswer);
  }

  async function next() {
    setLoadingNext(true);

    setPage((page += 1));

    const pageHelpOrders = await api.get('/students/help-orders', {
      params: {
        page,
      },
    });

    const checkFinalPage = await api.get('/students/help-orders', {
      params: {
        page: page + 1,
      },
    });

    if (checkFinalPage.data.length === 0) {
      setHelpOrders(pageHelpOrders.data);
      setLoadingNext(false);
      setFinalPage(true);
    } else {
      setLoadingNext(false);
      setFinalPage(false);
    }
  }

  async function previous() {
    setLoadingNext(true);
    setFinalPage(false);

    if (page !== 1) {
      setPage((page -= 1));
    }

    const pageHelpOrders = await api.get('/students/help-orders', {
      params: {
        page,
      },
    });

    setHelpOrders(pageHelpOrders.data);
    setLoadingNext(false);
  }

  const handleOpen = e => {
    setOpen(true);
    setQuestion(e.target.value);
    handleChangeAnswerId(Number(e.target.className));
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
          {helporders.map(helporder => (
            <li key={helporder.id}>
              <span>{helporder.student_name}</span>
              <div>
                <button
                  id="answer"
                  className={helporder.id}
                  type="button"
                  onClick={handleOpen}
                  value={helporder.question}
                >
                  answer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Content>

      <Pagination>
        <Previous
          type="button"
          onClick={() => previous()}
          page={page}
          loadingNext={loadingNext}
        >
          Previous
        </Previous>
        <Next
          type="button"
          onClick={() => next()}
          loadingNext={loadingNext}
          finalPage={finalPage}
        >
          Next
        </Next>
      </Pagination>

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
                {question}
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
                onChange={handleChangeAnswer}
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
              onClick={sendAnswer}
            >
              Answer Student
            </button>
          </div>
        </Fade>
      </Modal>
    </Container>
  );
}
