import React from 'react'
import Table, {Row, Cell} from 'porabote/table';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';
import ClearIcon from '@mui/icons-material/Clear';
import Upload, {FileInput, InputFileCustom} from "porabote/upload";

const RecordData = (props) => {

  const attrs = props.data.attributes;
  const {shift, department, avatar} = props.data.relationships;
  const avatarUri = (avatar) ? `/images${avatar.attributes.uri}` : '';

  const uploadAvatar = () => {
    //console.log(89);
  }

  return (
    <div>

      <Table grid-template-columns="150px minmax(200px, 1fr)">
        <Row>
          <Cell><b>Описание</b></Cell>
          <Cell>
            {attrs.description}
          </Cell>
        </Row>
        <Row>
          <Cell><b>Заголовок</b></Cell>
          <Cell>
            {attrs.subject}
          </Cell>
        </Row>
        <Row>
          <Cell><b>Тело письма</b></Cell>
          <Cell>
            {attrs.body}
          </Cell>
        </Row>
      </Table>



        <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

          <div className="link_with_icon" onClick={() => props.editRecord(props.getRecord)}>
            <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Редактировать данные
          </div>

          {/*<div className="link_with_icon" onClick={() => props.deleteRecord(user.id, props.fetchFeedData)}>*/}
          {/*  <ClearIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>*/}
          {/*  Удалить спикера*/}
          {/*</div>*/}

        </div>

    </div>
  );

}

export default RecordData;