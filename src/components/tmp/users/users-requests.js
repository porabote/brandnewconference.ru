import React from "react";
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import {Button} from "porabote/form";
import Api from "@services/api-service";
import { DOMAIN } from "@services/constants";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

const UsersRequests = (props) => {

  const {users_requests} = props.user.relationships;

  const createRequest = (user_id) => {
    Api.get(`/api/users/method/createUserRequest/?user_id=${props.user.id}`)
      .then((resp) => {
        props.getRecord();
      });
  }

  let button = <Button
    onClick={() => {
      createRequest(props.user.id);
    }}
    text="Создать приглашение"
    className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
    type="button"
    style={{width: '240px', marginTop: '20px'}}
  />;

  if (users_requests.length == 0) {
    return <div>
      {button}
      <div className="empty-data">Запросы не добавлялись</div>
    </div>
  }

  return (
    <div>
      {button}
      <StripedList style={{gridTemplateColumns: '150px 650px 100px 50px', margin: '30px 0'}}>

        <StripedListRow>
          <StripedListCell>
            Отправитель
          </StripedListCell>
          <StripedListCell>
            Ссылка
          </StripedListCell>
          <StripedListCell>
            Токен использован
          </StripedListCell>
          <StripedListCell>
          </StripedListCell>
        </StripedListRow>

        {users_requests.map((request, index) => {

          let isTokenUsed = (request.attributes.token) ? 'Нет' : request.attributes.date_confirm;

          return (
            <StripedListRow key={index}>
              <StripedListCell>
                {request.relationships.sender.attributes.name}
              </StripedListCell>
              <StripedListCell>
                {`${DOMAIN}/porabote/users/confirmInvitation/?requestId=${request.id}&token=${request.attributes.token}`}
              </StripedListCell>
              <StripedListCell>
                {`${isTokenUsed}`}
              </StripedListCell>
              <StripedListCell>
                <ForwardToInboxIcon
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    props.sendInvitationNotification(request.id);
                  }}
                />
              </StripedListCell>
            </StripedListRow>
        )
        })}
      </StripedList>

    </div>
  );
}

export default UsersRequests;