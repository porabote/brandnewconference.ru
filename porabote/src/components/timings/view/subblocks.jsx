import React from 'react';
import {useDispatch} from 'react-redux';
import {pushItemToModal} from "porabote/modal";
import AddForm from '../forms/add-form';
import Table, {Row, Cell} from "porabote/table";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Subblocks = (props) => {

  const dispatch = useDispatch();

  const openAddModal = () => {
    dispatch(pushItemToModal(
      <AddForm parentId={props.data.id} fetchData={props.fetchData} dicts={props.dicts} addRecord={props.addRecord} />,
      `Добавление`,
    ));
  }

  let data = props.data.relationships.subblocks || [];
console.log(props);
  return (
    <div>
      <Table grid-template-columns="1fr 200px 60px">
        <Row className='head'>
          <Cell>Наименование</Cell>
          <Cell>Время</Cell>
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
                <Cell>{item.attributes.desc_list}</Cell>
                <Cell></Cell>
                <Cell>
                  {/*<div className="link_with_icon" onClick={() => props.editSubRecord(item.attributes)}>*/}
                  {/*  <EditIcon style={{fontSize: '18px'}}/>*/}
                  {/*</div>*/}
                </Cell>
              </Row>
            );
          })
        }

      </Table>
    </div>
  );
};

export default Subblocks;