import React from 'react';
import Table, {Row, Cell} from "porabote/table";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const QuestionnairesVariantsList = (props) => {

  let variants = props.data.relationships.variants;

  return (
    <div>
      <Table grid-template-columns="1fr 100px 60px">
        <Row className='head'>
          <Cell>Вариант</Cell>
          <Cell>Голоса</Cell>
          <Cell>
            <div className="link_with_icon" onClick={() => props.addVariant()}>
              <AddIcon/>
            </div>
          </Cell>
        </Row>

        {
          variants.map(item => {
            return(
              <Row key={item.id} className='head'>
                <Cell>{item.attributes.name}</Cell>
                <Cell>{item.attributes.score}</Cell>
                <Cell>
                  <div className="link_with_icon" onClick={() => props.addVariant(item.attributes)}>
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

export default QuestionnairesVariantsList;