import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const RecordData = (props) => {

  const record = props.data.attributes;

  const statuses = {
    moderate: 'Hа модерации',
    accepted: 'Подтвержден',
    declined: 'Отклонен',
  }

  return (
    <div>

      <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
        <StripedListRow>
          <StripedListCell>ФИО</StripedListCell>
          <StripedListCell>
            {record.last_name} {record.name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Компания</StripedListCell>
          <StripedListCell>
            {record.company_name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Должность</StripedListCell>
          <StripedListCell>
            {record.post_name}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Email</StripedListCell>
          <StripedListCell>
            {record.email}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Телефон</StripedListCell>
          <StripedListCell>
            <b>{record.phone}</b>
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Формат</StripedListCell>
          <StripedListCell>
            {record.part_type}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Статус</StripedListCell>
          <StripedListCell>
            <b>{statuses[record.status]}</b>
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Дата регистрации</StripedListCell>
          <StripedListCell>
            {moment(record.created_at).format("DD/MM/YYYY")}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>dentsu_id</StripedListCell>
          <StripedListCell>
            {record.user_id}
          </StripedListCell>
        </StripedListRow>

      </StripedList>


      {(record.part_type == "offline") &&
        <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

          <div className="link_with_icon" onClick={() => props.acceptPart(record.id, props.getRecord)}>
            <ThumbUpOffAltIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Подтвердить участие
          </div>

          <div className="link_with_icon" onClick={() => props.declinePart(record.id, props.getRecord)}>
            <ThumbDownAltIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Отклонить
          </div>


        </div>
      }

    </div>
  );

}

export default RecordData;