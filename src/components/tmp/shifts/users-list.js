import React, { useEffect } from 'react'
import {useSelector} from "react-redux";
import Api from '@services/api-service'
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AlarmOnOutlinedIcon from '@material-ui/icons/AlarmOnOutlined';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';

const UsersList = (props) => {

  if (!props.isDictsLoaded) return <div className="empty-data">Данные загружаются</div>

  const {dicts} = useSelector(state => state.dicts);

  return (
    <div>
      <div className="links_with_icon__wrap">

        <div
          className="link_with_icon"
          onClick={() => {
            props.attachUser(props.fetchData);
          }}
        >
          <AddIcon style={{marginRight: '3px'}}/>
          Прикрепить пользователя
        </div>

      </div>

      <StripedList style={{gridTemplateColumns: '1fr 50px'}}>
        {props.rels.users.map((user, index) => {

          return (
            <StripedListRow key={index}>
              <StripedListCell>
                {user.attributes.name} - {user.attributes.post_name}
              </StripedListCell>
              <StripedListCell className="grid_list__item center">
                <RemoveCircleIcon
                  className="link_with_icon grey"
                  onClick={() => props.detachUser(user.id, props.fetchData)}
                />
              </StripedListCell>
            </StripedListRow>
          )
        })}
      </StripedList>
    </div>
  );
}

export default UsersList;