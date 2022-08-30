import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';

const RecordData = (props) => {

  const record = props.data.attributes;

  return (
    <div>

      <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Название</StripedListCell>
          <StripedListCell>
            {record.name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Ссылка</StripedListCell>
          <StripedListCell>
            {record.link}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Родитель</StripedListCell>
          <StripedListCell>
            {record.parent_id && props.dicts.menus[record.parent_id]['name']}
          </StripedListCell>
        </StripedListRow>

      </StripedList>



        <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

          <div className="link_with_icon" onClick={() => props.editRecord(props.getRecord)}>
            <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Редактировать данные
          </div>

        </div>


    </div>
  );

}

export default RecordData;