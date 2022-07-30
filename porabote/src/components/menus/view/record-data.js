import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';

const RecordData = (props) => {

  const user = props.data.attributes;
  const {shift, department, avatar} = props.data.relationships;
  const avatarUri = (avatar) ? avatar.attributes.uri : '';

  const genderList = {'m': 'Муж.', 'f': 'Жен.'};

  return (
    <div>

      <div className="user-profile">
        <div className="user-profile-avatar">
          <div className="user-profile-avatar-img" style={{backgroundImage: `url('${avatarUri}')`}}></div>
        </div>
        <div className="user-profile-name">{user.name} {user.patronymic}</div>
        <div className="user-profile-post_name">{user.post_name}</div>
      </div>

      <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Площадка</StripedListCell>
          <StripedListCell>
            {department && department.attributes.account.ru_name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Департамент</StripedListCell>
          <StripedListCell>
            {department && department.attributes.name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Должность</StripedListCell>
          <StripedListCell>
            {user.post_name}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>График работы</StripedListCell>
          <StripedListCell>
            {shift && shift.attributes.title}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Email/логин</StripedListCell>
          <StripedListCell>
            <b>{user.email}</b>
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Дополнительный email</StripedListCell>
          <StripedListCell>
            {user.email_extra}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Телефон</StripedListCell>
          <StripedListCell>
            <b>{user.phone}</b>
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Дата рождения</StripedListCell>
          <StripedListCell>
            {user.date_birth}
          </StripedListCell>
        </StripedListRow>

        <StripedListRow>
          <StripedListCell>Пол</StripedListCell>
          <StripedListCell>
            {genderList[user.sex]}
          </StripedListCell>
        </StripedListRow>

      </StripedList>


      {(props.isCanEdit || props.isItOwn) &&
        <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

          <div className="link_with_icon" onClick={() => props.editUser(props.getRecord)}>
            <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Редактировать данные
          </div>

          <div className="link_with_icon" onClick={() => props.editPassport(props.getRecord)}>
            <SubjectIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Паспорт
          </div>

          <div className="link_with_icon" onClick={() => props.editForeignPassport(props.getRecord)}>
            <SubjectIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Заграничный паспорт
          </div>

        </div>
      }

    </div>
  );

}

export default RecordData;