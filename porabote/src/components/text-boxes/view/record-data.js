import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';

const RecordData = (props) => {

  const record = props.data.attributes;

  return (
    <div>

      <StripedList style={{gridTemplateColumns: '200px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Описание/комментарий к тексту</StripedListCell>
          <StripedListCell>
            {record.desc}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Текст</StripedListCell>
          <StripedListCell>
            {record.box_text}
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