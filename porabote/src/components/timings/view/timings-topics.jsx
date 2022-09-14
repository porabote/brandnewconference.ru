import React from 'react';
import {useDispatch} from 'react-redux';
import {pushItemToModal} from "porabote/modal";
import AddForm from '@components/timings-topics/forms/add-form';
import Table, {Row, Cell} from "porabote/table";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Speakers from "@components/timings-topics/speakers";
import EditForm from "@components/timings-topics/forms/edit-form";

const TimingsTopics = (props) => {

  const dispatch = useDispatch();

  let data = props.data.relationships.topics || [];

  const openAddModal = () => {
    dispatch(pushItemToModal(
      <AddForm timingId={props.data.id} fetchData={props.fetchData} dicts={props.dicts} addRecord={props.addRecord} />,
      `Добавление`,
    ));
  }

  const openEditModal = (data) => {
    dispatch(pushItemToModal(
      <EditForm timingId={props.data.id} fetchData={props.fetchData} dicts={props.dicts} data={data} />,
      `Добавление`,
    ));
  }

  return (
    <div>
      <Table grid-template-columns="1fr 1fr 100px 60px">
        <Row className='head'>
          <Cell>Описание</Cell>
          <Cell>Описание короткое</Cell>
          <Cell></Cell>
          <Cell>
            <div className="link_with_icon" onClick={() => openAddModal()}>
              <AddIcon/>
            </div>
          </Cell>
        </Row>

        {
          data.map(item => {
            return(
              <Row key={item.id} className='head'>
                <Cell>{item.attributes.desc}</Cell>
                <Cell>{item.attributes.desc_short}</Cell>
                <Cell>
                  <p
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      dispatch(pushItemToModal(
                        <Speakers topicId={item.id} fetchData={props.fetchData} dicts={props.dicts} addRecord={props.addRecord} />,
                        `Спикеры`,
                      ));
                    }}
                  >Спикеры</p>
                </Cell>
                <Cell>
                  <div className="link_with_icon" onClick={() => openEditModal(item)}>
                    <EditIcon style={{fontSize: '18px'}}/>
                  </div>
                </Cell>
              </Row>
            );
          })
        }

      </Table>
    </div>
  );
};

export default TimingsTopics;