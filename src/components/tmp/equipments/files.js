import React, {Component} from 'react'
import {connect} from 'react-redux';
import {FILES_URL} from '@services/constants'
import FilesEditInfo from "./files-edit-info";
import {ButtonUpload, Field, InputHidden, Textarea} from 'porabote/form'
import Api from "@services/api-service";
import {StripedList, StripedListCell, StripedListRow} from 'porabote/striped-list'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment'

class Files extends Component {

  deleteFile = data => {

    Api.get(`/api/files/method/markToDelete/${data.id}/`)
      .then((data) => {
        this.props.getRecord();
      });

  }

  render() {

    const files = this.props.files || [];

    return (
      <div>

        <ButtonUpload
          progressBar={false}
          uri='/api/equipments/method/uploadRecordFile/'
          previewPanel={() => {
            return (
              <div>
                <Field>
                  <Textarea grid="flex" label="Название" value="345" name="dscr"/>
                </Field>

                <Field>
                  <InputHidden name="record_id" defaultValue={this.props.data.id}/>
                </Field>

                <Field>
                  <InputHidden name="model_alias" defaultValue="equipments"/>
                </Field>
              </div>
            )
          }}
          afterUpload={(response, params) => {
            this.props.getRecord();
            params.removeModalItem(params.modalKey);
          }}
        >
          <span>Загрузить документ</span>
        </ButtonUpload>

        <div style={{paddingBottom: '20px'}}></div>

        {files.length == 0 &&
          <p className="no_records">Записи не найдены</p>
        }

        <StripedList style={{gridTemplateColumns: '1fr 50px 130px 30px 30px'}}>
          {files.map((file, index) => {
            return (
              <StripedListRow key={index}>
                <StripedListCell>
                  {file.attributes.dscr}
                </StripedListCell>
                <StripedListCell>
                  <a
                    href={`${FILES_URL}${file.attributes.uri}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileDownloadIcon style={{color: 'rgba(255,205,4,0.96)'}}/>
                  </a>
                </StripedListCell>
                <StripedListCell>
                  {moment(file.attributes.created_at).format("DD-MM-Y HH:mm")}
                </StripedListCell>
                <StripedListCell>
                  <EditIcon
                    style={{color: 'rgba(243,111,161,0.96)', cursor: 'pointer'}}
                    onClick={() => {
                      this.props.pushModalItem(
                        'Редактировать файл',
                        <FilesEditInfo getRecord={this.props.getRecord} data={file.attributes}/>
                      );
                    }}
                  />
                </StripedListCell>
              <StripedListCell>
                <DeleteOutlineIcon
                  style={{color: 'rgba(243,111,161,0.96)', cursor: 'pointer', fontSize: '24px'}}
                  onClick={() => {
                    this.props.openConfirm(
                      `Удалить файл - <i> ${file.attributes.dscr} <br> ${file.attributes.basename}</i>`,
                      this.deleteFile,
                      file,
                    )
                  }}
                />
              </StripedListCell>
          </StripedListRow>
          )
          })}
        </StripedList>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirm: (msg, approveCallback, callbackData) => dispatch({
      type: "OPEN_CONFIRM",
      payload: {msg, approveCallback, callbackData},
    }),
    pushModalItem: (title, content) => dispatch({
      type: 'PUSH_MODAL_ITEM',
      payload: {title, content},
    }),
  }
}
export default connect(null, mapDispatchToProps)(Files);