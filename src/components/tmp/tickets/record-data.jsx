import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Table, {Row, Cell} from "porabote/table";
import EditTicketRequest from "./edit-ticket-request";
import moment from "moment";

const RecordData = (props) => {

  const {city_to, status} = props.rels;

  let passport_types = {
    russian: 'Паспорт',
    foreign: 'Загранпаспорт',
  };

  return (
    <div>

      <h3 style={{paddingBottom: '20px'}}>Данные запроса</h3>

      <Table grid-template-columns="200px 1fr">
        <Row>
          <Cell>Город прилеты</Cell>
          <Cell><b>{city_to && city_to.attributes.name_ru} - {city_to && city_to.attributes.name_en}</b></Cell>
        </Row>
        <Row>
          <Cell>Дата вылета</Cell>
          <Cell><b>{moment(props.attrs.date).format('DD-MM-Y')}</b></Cell>
        </Row>
        <Row>
          <Cell>Документ по умолчанию</Cell>
          <Cell>{passport_types[props.attrs.passport_type]}</Cell>
        </Row>
        <Row>
          <Cell><b>Объект</b></Cell>
          <Cell>{props.attrs.comment}</Cell>
        </Row>
        <Row>
          <Cell>Статус</Cell>
          <Cell>{status.attributes.name}</Cell>
        </Row>
        <Row>
          <Cell>Создан</Cell>
          <Cell>{moment(props.attrs.created_at).format('DD-MM-Y')}</Cell>
        </Row>
      </Table>

      <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

        <div className="link_with_icon" onClick={() => props.editTicketsRequest(props.attrs.id, props.attrs, props.fetchData)}>
          <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
          Редактировать данные
        </div>

      </div>

    </div>
  );
}

export default RecordData;