import React from "react";
import { useDispatch } from 'react-redux';
import Api from "@services";
import {pushItemToModal, removeModalItem} from "porabote/modal";
import Upload, {PreviewPanel, FileInput} from "porabote/upload";
import {Form, Field, Input, InputHidden, SubmitButton, Button} from "porabote/form";
import Table, {Row, Cell} from "porabote/table";
import FileDownloadDoneRoundedIcon from '@mui/icons-material/FileDownloadDoneRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import EditIcon from '@mui/icons-material/Edit';
import {FILES_URL} from "@configs";
import {EditDescription} from "@components/files";

const Files = (props) => {

  const dispatch = useDispatch();

  const uploadCallback = (files) => {
    props.fetchData();
  }

  const editDescription = (id, dscr) => {
    dispatch(pushItemToModal(
      <EditDescription id={id} dscr={dscr}  editDescriptionSubmit={editDescriptionSubmit} />,
      'Редактировать описание'
    ));
  }
  
  const editDescriptionSubmit = (id, dscr, modalKey) => {

    Api.post(`/api/files/method/editDescription/${id}/`, {
      body: {
        dscr
      }
    }).then((resp) => {
      dispatch(removeModalItem(modalKey));
      props.fetchData();
    });
  }

  const deleteFile = (id) => {
    Api.get(`/api/files/method/markToDelete/${id}/`)
      .then((resp) => {
        props.fetchData();
      });
  }

  const setDataFields = (file, index) => {
    return (
      <div>
        <Field>
          <Input placeholder="Комментарий" name={`filesCustomData.${index}.dscr`}/>
        </Field>
      </div>
    );
  }

  return (
    <div>
      <Upload uploadCallback={uploadCallback} data={{
        record_id: props.record_id,
        model_alias: props.model_alias,
      }}>
        <FileInput name="files[]" uploadCallback={uploadCallback}/>
        <PreviewPanel setDataFields={setDataFields}>
        </PreviewPanel>
      </Upload>

      <h3 style={{padding: '50px 0 20px 0'}}>Загруженные файлы</h3>

      <Table border={true} grid-template-columns="minmax(200px, 1fr) 200px 200px 1fr 50px 50px">
        <Row className="head">
          <Cell>Название</Cell>
          <Cell>Размер</Cell>
          <Cell>Тип</Cell>
          <Cell>Комментарий</Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Row>
        {props.files.map((file, index) => {

          return (
            <Row key={index}>
              <Cell><a href={`${FILES_URL}${file.attributes.uri}`} target="_blank">{file.attributes.basename}</a></Cell>
              <Cell>{`${Math.round(file.attributes.size / 1024)}`} KB</Cell>
              <Cell>{file.attributes.mime}</Cell>
              <Cell>{file.attributes.dscr}</Cell>
              <Cell className="preview-panel__cell-delete">
                <EditIcon style={{fontSize: '19px'}} onClick={() => editDescription(file.id, file.attributes.dscr)}
                          className="link_with_icon"/>
              </Cell>
              <Cell className="preview-panel__cell-delete">
                <RemoveCircleOutlineRoundedIcon onClick={() => deleteFile(file.id)}
                                                className="preview-panel__delete-icon"/>
              </Cell>
            </Row>
          );
        })}
      </Table>

    </div>
  );
}

export default Files;