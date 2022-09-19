import React, {useEffect, useCallback, useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import {openModal} from "@components/common/modal";
import QuestionnairesModal from "./questionnaires-modal";

const Questionnaires = (props) => {

  if (!props.loading) return <p></p>;

  const ws = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(props.data || []);

  let activeButtons = [];
  data.map((item => {
    if (item.active_flg ) activeButtons[item.id] = item;
  }));

  const [buttons, setButtons] = useState(activeButtons);
  const [status, setStatus] = useState("");

  useEffect(() => {
    connect();
    return () => ws.current.close(); // когда меняется isPaused - соединение закрывается
  }, [ws]);


  const connect = () => {
    if (!isConnected) {

        ws.current = new WebSocket(`wss://brandnewconference.ru:8000`);
        ws.current.onopen = () => {
          console.log('connected!');
          setIsConnected(1)
        };
        ws.current.onclose = () => {
          setTimeout(() => {
            connect();
          }, 5000);
        }

        if (!ws) return;
        ws.current.onmessage = e => {//подписка на получение данных по вебсокету

          let message = JSON.parse(e.data);

          let buttons = [];
          data.map(item => {

            if(typeof message == "string") message = JSON.parse(message);

            Object.keys(message.questions).map(key => {
              if (message.questions[key] == item.id) {
                buttons[item.id] = item;
              }
            });
          });
          setButtons(buttons);
          //setMessage(message);
        };
    }
  }

  // const listeningStream = useCallback((ws) => {
  //
  //   if (!ws) return;
  //   ws.onmessage = e => {//подписка на получение данных по вебсокету
  //     if (!isConnected) return;
  //     const message = JSON.parse(e.data);
  //     console.log(message);
  //     //setMessage(message);
  //   };
  // }, [isConnected]);




  const dispatch = useDispatch();

  const openQuestionModal = (question) => {
    dispatch(openModal(<QuestionnairesModal data={question} />, 'Вопрос'));
  }
  
  return (
    <div>

      <div style={{padding: '40px 0'}}>
        Подключено к серверу {isConnected ? 'Да' : 'Нет'}
      </div>


      {buttons.map(question => {
        return(
          <div key={question.id} className="btn btn-outline-dark" onClick={() => openQuestionModal(question)}>
            <span className="arrow-icon">{question.question}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Questionnaires;