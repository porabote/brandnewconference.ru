import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';
import Upload, {FileInput, InputFileCustom} from "porabote/upload";

const RecordData = (props) => {

  return (
    <div>
      <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Вопрос</StripedListCell>
          <StripedListCell>
            {props.data.attributes.question}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Ответ</StripedListCell>
          <StripedListCell>
            {props.data.attributes.answer}
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