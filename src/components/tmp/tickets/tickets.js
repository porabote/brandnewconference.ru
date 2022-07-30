import React, {useEffect, useState} from "react";
import Table, {Row, Cell} from "porabote/table";
import moment from "moment";
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';

const Tickets = (props) => {

  let passport_types = {
    russian: 'Паспорт',
    foreign: 'Загранпаспорт',
  };

  return (
    <div>

      <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

        <div className="link_with_icon" onClick={() => props.addTickets(props.data.id, props.setTickets)}>
          <AirplaneTicketIcon style={{fontSize: '23px'}} className="link_with_icon__icon"/>
          Добавить
        </div>

      </div>

      <Table grid-template-columns="50px 1fr 170px 100px 170px 170px 170px 200px 50px 50px">
        <Row className="head">
          <Cell>ID</Cell>
          <Cell>ФИО</Cell>
          <Cell>Серия/Номер/Документ</Cell>
          <Cell>Дата вылета</Cell>
          <Cell>Город отбытия </Cell>
          <Cell>Город прибытия</Cell>
          <Cell>Комментарий</Cell>
          <Cell>Email</Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Row>
        {props.tickets.map((ticket, index) => {

          let {user, city_from, city_to} = ticket.relationships;

          let passport = (user) ? user.attributes.passport : null;
          let passport_foreign = (user) ? user.attributes.passport_foreign : null;

          let sery, number = '';
          if (ticket.attributes.passport_type == 'russian' && passport) {
            sery = passport.sery;
            number = passport.number;
          } else if (passport_foreign) {
            sery = passport_foreign.sery;
            number = passport_foreign.number;
          }

          let fi = '';
          if (ticket.attributes.passport_type == 'foreign' && passport_foreign) {
            fi = `${user.attributes.last_name_en} ${user.attributes.name_en}`;
          }

          return (
            <Row key={index}>
              <Cell>{ticket.id}</Cell>
              <Cell>
                <b>{user && user.attributes.name} {user && user.attributes.last_name}</b><br/>
                {passport_foreign && passport_foreign.name_en} {passport_foreign && passport_foreign.last_name_en}
              </Cell>
              <Cell>
                <b>{sery} / {number}</b><br/>
                {ticket.attributes.passport_type && passport_types[ticket.attributes.passport_type]}
              </Cell>
              <Cell>{ticket.attributes.date}</Cell>
              <Cell>{city_from && city_from.attributes.name_ru} - {city_from && city_from.attributes.name_en}</Cell>
              <Cell>{city_to && city_to.attributes.name_ru} - {city_to && city_to.attributes.name_en}</Cell>
              {/*<Cell>{passport_foreign && moment(passport_foreign.date_of_expires).format("DD/MM/YYYY")}</Cell>*/}
              <Cell>{ticket.attributes.comment}</Cell>
              <Cell>{user.attributes.email}</Cell>
              <Cell>
                <EditIcon
                  className="link_with_icon grey"
                  style={{fontSize: '22px'}}
                  onClick={() => props.editTicket(ticket.id, ticket, props.setTickets)}
                />
              </Cell>
              <Cell>
                <RemoveCircleIcon
                  className="link_with_icon grey"
                  style={{fontSize: '20px'}}
                  onClick={() => props.deleteTicket(ticket.id, props.setTickets)}
                />
              </Cell>
            </Row>
          )
        })}
      </Table>

      <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>
        <div className="link_with_icon" onClick={() => props.downloadTicketsList(props.data.id)}>
          <SimCardDownloadIcon style={{fontSize: '22px'}} className="link_with_icon__icon"/>
          Скачать
        </div>
      </div>

    </div>
  );
}

export default Tickets;