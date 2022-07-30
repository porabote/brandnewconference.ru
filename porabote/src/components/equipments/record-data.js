import React, {Component} from "react";
import {connect} from "react-redux";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import ChangeStatus from "./change-status";
import EquipmentsAddForm from "./equipments-add-form";
import Files from "./files";
import { Button } from "porabote/form";

class RecordData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  render() {

    const {data, dicts} = this.props

    if (data === null) {
      return (
        <StripedList>
          <StripedListRow>
            <StripedListCell>Данные не загружены</StripedListCell>
          </StripedListRow>
        </StripedList>
      )
    }

    const attrs = data.attributes;

    let {
      organizations_own,
      platform,
      object,
      hole,
      comments,
      files,
      history,
      user,
      type,
      status,
      status_reason,
    } = data.relationships;

    let status_log = attrs.status_log ? JSON.parse(attrs.status_log) : [];

    return (

      <div style={{
        display: 'grid',
        gridTemplateColumns: '47% 47%',
      }}>

        <div>
          <h3 style={{padding: '0px 0 10px 0'}}>Информация</h3>
          <StripedList style={{gridTemplateColumns: '250px 1fr'}}>
            <StripedListRow>
              <StripedListCell>Организация</StripedListCell>
              <StripedListCell>
                {organizations_own && organizations_own.attributes.name}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Площадка</StripedListCell>
              <StripedListCell>
                {platform && platform.attributes.ru_alias}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Объект</StripedListCell>
              <StripedListCell>
                {object && object.attributes.name}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Скважина</StripedListCell>
              <StripedListCell>
                {hole && hole.attributes.name}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>SAP №</StripedListCell>
              <StripedListCell>
                {attrs.sap_number}
              </StripedListCell>
            </StripedListRow>

            <StripedListRow>
              <StripedListCell>Категория</StripedListCell>
              <StripedListCell>
                {type && type.attributes.name}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Наименование оборудования</StripedListCell>
              <StripedListCell>
                <b>{attrs.name}</b>
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Обозначение (тип, марка)</StripedListCell>
              <StripedListCell>
                {attrs.brand_name}
              </StripedListCell>
            </StripedListRow>

            <StripedListRow>
              <StripedListCell>Завод-изготовитель</StripedListCell>
              <StripedListCell>
                {attrs.factory_name}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Зав.№ (VIN)</StripedListCell>
              <StripedListCell>
                {attrs.vin_code}
              </StripedListCell>
            </StripedListRow>

            <StripedListRow>
              <StripedListCell>Инв. №</StripedListCell>
              <StripedListCell>
                {attrs.inventory_number}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Дата изготовления</StripedListCell>
              <StripedListCell>
                {attrs.release_date && moment(attrs.release_date).format("DD-MM-Y")}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Дата ввода в эксплуатацию</StripedListCell>
              <StripedListCell>
                {attrs.operation_start && moment(attrs.operation_start).format("DD-MM-Y")}
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Статус эксплуатации</StripedListCell>
              <StripedListCell>
                <b>{status && status.attributes.name}</b>
              </StripedListCell>
            </StripedListRow>
            <StripedListRow>
              <StripedListCell>Причина</StripedListCell>
              <StripedListCell>
                <b>{status_reason && status_reason.attributes.name}</b>
              </StripedListCell>
            </StripedListRow>
          </StripedList>

          <div className="links_with_icon__wrap" style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>

            <div
              className="link_with_icon"
              onClick={() => {
                this.props.pushItemToModal(
                  <ChangeStatus
                    getRecord={this.props.getRecord}
                    record_id={data.id}
                  />,
                  'Изменить статус',
                );
              }}
            >
              <AutorenewOutlinedIcon className="link_with_icon__icon"/>
              Изменить статус
            </div>

            <div
              className="link_with_icon"
              onClick={() => {
                this.props.pushItemToModal(
                  <EquipmentsAddForm
                    getRecord={this.props.getRecord}
                    record={data.attributes}
                  />,
                  'Изменить статус',
                );
              }}
            >
              <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
              Редактировать данные
            </div>

          </div>

          <div>
            <h3 style={{padding: '20px 0 10px 0'}}>История статусов</h3>
            <StripedList style={{gridTemplateColumns: '25% 25% 20% 30%'}}>
              <StripedListRow key={99}>
                <StripedListCell>Статус</StripedListCell>
                <StripedListCell>Изменен</StripedListCell>
                <StripedListCell>Причина</StripedListCell>
                <StripedListCell>Изменил</StripedListCell>
              </StripedListRow>
              {status_log.map((item, index) => {
                return (
                  <StripedListRow key={index}>
                    <StripedListCell>{item.status}</StripedListCell>
                    <StripedListCell>{moment(item.datetime).format("DD-MM-Y")}</StripedListCell>
                    <StripedListCell>{item.status_reason}</StripedListCell>
                    <StripedListCell>{item.user_name}</StripedListCell>
                  </StripedListRow>
                );
              })}
            </StripedList>
          </div>

          <div style={{width: '1000px', margin: '20px auto'}}>
            <Button
              className="on-button grey-stroke_x_yellow-fill icon-excel__grey_x_white"
              type="button"
              onClick={() => {
                window.open(`https://api.thyssen24.ru/api/equipments/method/exportToExcel/?id=${attrs.id}`, 'target=_blank')
              }}
            >Выгрузка РЭП Excel
            </Button>
          </div>

        </div>

        <div style={{paddingLeft: '6%'}}>
          <h3 style={{padding: '0px 0 10px 0'}}>Файлы</h3>
          <Files
            getRecord={this.props.getRecord}
            files={data.relationships.files}
            data={data}
          />
        </div>

      </div>
    )
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    pushItemToModal: (content, title) => dispatch({type: 'PUSH_MODAL_ITEM', payload: {title, content}}),
  }
}
export default connect(null, mapDispatchToProps)(RecordData)