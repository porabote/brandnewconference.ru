import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';
import ClearIcon from '@mui/icons-material/Clear';
import Upload, {FileInput, InputFileCustom} from "porabote/upload";

const RecordData = (props) => {

  const user = props.data.attributes;
  const {shift, department, avatar} = props.data.relationships;
  const avatarUri = (avatar) ? `/images${avatar.attributes.uri}` : '';

  const uploadAvatar = () => {
    //console.log(89);
  }

  return (
    <div>

      <div className="user-profile">

        <Upload preview={false} uploadCallback={uploadAvatar} data={{
          record_id: user.id,
          model_alias: "Speakers",
          label: "avatar",
        }}>
          <FileInput name="files[]" uploadCallback={uploadAvatar}>
            <div className="user-profile-avatar" onClick={uploadAvatar} style={{cursor: 'pointer'}}>
              <div className="user-profile-avatar-img" style={{backgroundImage: `url('${avatarUri}')`}}></div>
            </div>
          </FileInput>
        </Upload>


        <div className="user-profile-name">{user.last_name} {user.name} {user.patronymic}</div>
        <div className="user-profile-post_name">{user.post_name}</div>
      </div>

      <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Площадка</StripedListCell>
          <StripedListCell>
            {department && department.attributes.account.ru_name}
          </StripedListCell>
        </StripedListRow>
      </StripedList>



        <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

          <div className="link_with_icon" onClick={() => props.editRecord(props.getRecord)}>
            <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Редактировать данные
          </div>

          <div className="link_with_icon" onClick={() => props.deleteRecord(user.id, props.fetchFeedData)}>
            <ClearIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Удалить спикера
          </div>

        </div>

    </div>
  );

}

export default RecordData;