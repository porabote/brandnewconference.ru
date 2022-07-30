import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  StripedList,
  StripedListRow,
  StripedListCell,
  StripedDropMenu,
  StripedDropLink
} from 'porabote/striped-list';
import {
  Button,
} from "porabote/form";

const AcceptListsSigning = (props) => {

  const { user } = useSelector(state => state.auth);

  let stepCount = 0;
  if (!props.isStepsLoaded) return <p>Данные загружаются</p>;

  return(
    <div>
      {props.steps.map((step, index) => {

        stepCount++;

        let { acceptor } = step;

        let whoNeedSign = null;
        for (let i = 0; i < props.steps.length; i++) {
          let step = props.steps[i];

          if (!step.acceptor.accepted_at) {
            whoNeedSign = step.acceptor.user_id;
            break;
          } else if (!step.acceptor.accepted_at && step.acceptor.user_id == user.id) {
            whoNeedSign = step.acceptor.user_id;
            break;
          }
        }

        let name = acceptor.api_user.name;

        return (
          <div style={{
            gridTemplateColumns: '50px 450px',
            maxWidth: '550px',
            display: 'grid',
            alignItems: 'center',
            borderBottom: '1px dashed #eef2f7',
            paddingBottom: '20px',
          }} key={index}>

            <div style={{paddingTop: '4px'}}>
              <StripedDropMenu>
                {props.isCanChangeAcceptor && !step.acceptor.accepted_at &&
                  <div
                    onClick={() => {
                      props.changeAcceptor(step);
                    }}
                  >
                    Изменить персону
                  </div>
                }
              </StripedDropMenu>
            </div>

            <div>
              {stepCount}. {step.acceptor.accepted_at} {name}
            </div>

            <div key={index}>
              {whoNeedSign == user.id && whoNeedSign == step.acceptor.user_id && !step.acceptor.accepted_at &&
                <div style={{
                  gridTemplateColumns: '50px 160px 250px',
                  display: 'grid',
                  alignItems: 'center'
                }}>
                  <span></span>
                  <Button
                    text="Отклонить"
                    className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                    type="button"
                    onClick={() => {
                      props.declineStep(step.id);
                    }}
                    style={{width: '120px', marginTop: '20px'}}
                  />

                  <Button
                    text="Подписать"
                    className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                    type="button"
                    onClick={() => {
                      props.acceptStep(step.id);
                    }}
                    style={{width: '160px', marginTop: '20px'}}
                  />
                </div>
              }
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default AcceptListsSigning;