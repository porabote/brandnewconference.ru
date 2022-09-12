import React from 'react';
import Table, {Row, Cell} from "porabote/table";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import QuestionnairesVariants from "/app/models/QuestionnairesVariants";

const QuestionnairesVariantsList = (props) => {

  console.log(props.relationships)

  return (
    <div>
      <Table grid-template-columns="1fr 100px 60px">
        <Row className='head'>
          <Cell>Вариант</Cell>
          <Cell>Голоса</Cell>
          <Cell>

            <div
              className="link_with_icon"
              onClick={() => {
                this.props.pushItemToModal(
                  <RepairsAdd
                    getRecord={this.props.getRecord}
                    record={this.props.record}
                  />,
                  'Добавить',
                );
              }}
            >
              <AddIcon/>
            </div>

            <div
              className="link_with_icon"
              onClick={() => {
                this.props.pushItemToModal(
                  <RepairsAdd
                    getRecord={this.props.getRecord}
                    record={this.props.record}
                    data={data}
                  />,
                  'Добавить',
                );
              }}
            >
              <EditIcon style={{fontSize: '18px'}}/>
            </div>
          </Cell>
        </Row>
      </Table>
    </div>
  );
};

export default QuestionnairesVariantsList;