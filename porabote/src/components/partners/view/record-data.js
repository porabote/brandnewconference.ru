import React from 'react'
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';
import Upload, {FileInput, InputFileCustom} from "porabote/upload";

const RecordData = (props) => {

  const record = props.data.attributes;

  const {avatar} = props.data.relationships;
  const avatarUri = (avatar) ? `/images${avatar.attributes.uri}` : '';

  const uploadAvatar = () => {
    props.getRecord();
  }

  return (
    <div>

      <Upload preview={false} uploadCallback={uploadAvatar} data={{
        record_id: record.id,
        model_alias: "Partners",
        label: "avatar",
      }}>
        <FileInput name="files[]" uploadCallback={uploadAvatar}>
          <div className="user-profile-avatar" onClick={uploadAvatar} style={{cursor: 'pointer'}}>
            <div className="user-profile-avatar-img" style={{backgroundImage: `url('${avatarUri}')`}}></div>
          </div>
        </FileInput>
      </Upload>

      <StripedList style={{gridTemplateColumns: '250px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Название</StripedListCell>
          <StripedListCell>
            {record.name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Ссылка</StripedListCell>
          <StripedListCell>
            {record.list}
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