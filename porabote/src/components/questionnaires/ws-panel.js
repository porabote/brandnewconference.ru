import React, {useEffect, useCallback, useState, useRef} from 'react';
import Api from "@services";
import {
  Form,
  Button,
  Field,
  Checkbox,
  Radio,
  RadioInput,
  SubmitButton
} from "porabote/form";
import {Masks} from "porabote/form";

const WsPanel = (props) => {


  const ws = useRef(null);

  const [data, setData] = useState([]);
  const [values, setValues] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    connect();
    return () => {// кода меняется isConnected - соединение закрывается
      console.log(ws.current)
     // if (ws)
        ws.current.close()
    }
  }, []);

  const connect = () => {

    getRecords();

    if (!isConnected) {

      ws.current = new WebSocket(`wss://brandnewconference.ru:8000`);

      ws.current.onopen = () => {
        console.log('connected!');
        setIsConnected(1)
      };

      ws.current.onerror = function (err) {
        console.log('disconnected!');
        //console.error('Socket encountered error: ', err.message, 'Closing socket');
        ws.current.close();
      };

      ws.current.onclose = () => {
        setTimeout(() => {
          connect();
        }, 5000);
      }

      //  listeningStream();
    }
  }
  //
  //
  // useEffect(() => {
  //   getRecords();
  // }, []);

  const getRecords = () => {
    Api.get(`/api/questionnaires/get/`)
      .then((resp) => {
        setData(resp.data);

        let values = {questions: {}};
        resp.data.map((item) => {
          values.questions[item.id] = item.attributes.active_flg.toString();
        });
        setValues(values);
      });
  }

  if (Object.keys(values).length == 0) return <p></p>;

  const submitData = (values) => {
    ws.current.send(JSON.stringify(values));

    Api.post(`/api/questionnaires/method/saveActives/`, {
      body: values,
    })
      .then((resp) => {
        //setData(resp.data);
      });
  }

  return (
    <div style={{background: '#fff', padding: '40px'}}>

      <div style={{padding: '40px 0'}}>
        Подключено к серверу {isConnected ? 'Да' : 'Нет'}
      </div>

      <Form values={values} submitForm={submitData}>


        {data.map(question => {
          return (
            <Field key={question.id}>
              <Checkbox
                value="1"
                initChecked={(question.attributes.active_flg == 1) ? true : false}
                name={`questions.${question.id}`}
                value={question.id}
                label={question.attributes.question}
              />
            </Field>
          );
        })}

        <div style={{marginTop: '30px'}}>
          <SubmitButton className="btn btn-outline-dark">
            <span className="arrow-icon">Отправить</span>
          </SubmitButton>
        </div>

      </Form>
    </div>
  );
};

export default WsPanel;