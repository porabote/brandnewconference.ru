import React from "react";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";
import EditIcon from '@mui/icons-material/Edit';

const RecordData = (props) => {

  return (
    <div>
      <h3 style={{padding: '0px 0 10px 0'}}>Информация</h3>
      <StripedList style={{gridTemplateColumns: '250px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Наименование</StripedListCell>
          <StripedListCell>
            {props.attrs.title}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Руководитель</StripedListCell>
          <StripedListCell>
            {props.rels.head_user && props.rels.head_user.attributes.name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Платформа</StripedListCell>
          <StripedListCell>
            {props.rels.platform && props.rels.platform.attributes.ru_alias}
          </StripedListCell>
        </StripedListRow>
      </StripedList>

      <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

        <div className="link_with_icon" onClick={() => props.edit(props)}>
          <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
          Редактировать данные
        </div>

      </div>

    </div>

  );
}

export default RecordData;