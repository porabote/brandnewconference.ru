import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list'
import moment from 'moment';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import EditIcon from '@mui/icons-material/Edit';
import SparesAddForm from "./spares-add-form";
import MoveToOtherStore from "./move-to-other-store";
import Api from "@services/api-service";

class ReportData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  setAcceptStatus = () => {
    Api.get(`/api/spares/method/setAcceptStatus/${this.props.data.id}`).then((data) => {
      this.props.getRecord();
    })
  }

  moveToOtherStore = () => {
    this.props.pushItemToModal(
      <MoveToOtherStore data={this.props.data.attributes}/>,
      'Переместить на другой склад'
    );
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

    const {relationships: rels, attributes: attr} = data;

    return (
      <React.Fragment>

        <StripedList style={{gridTemplateColumns: '150px 1fr'}}>

          <StripedListRow>
            <StripedListCell><b>Название</b></StripedListCell>
            <StripedListCell>{attr.name}</StripedListCell>
          </StripedListRow>
          <StripedListRow>
            <StripedListCell><b>Описание</b></StripedListCell>
            <StripedListCell>{attr.description}</StripedListCell>
          </StripedListRow>
          <StripedListRow>
            <StripedListCell><b>Количество</b></StripedListCell>
            <StripedListCell>{attr.quantity}</StripedListCell>
          </StripedListRow>
          <StripedListRow>
            <StripedListCell><b>Единица измерения</b></StripedListCell>
            <StripedListCell>{attr.unit}</StripedListCell>
          </StripedListRow>

          <StripedListRow>
            <StripedListCell><b>Объект</b></StripedListCell>
            <StripedListCell>
              {typeof rels.store !== "undefined" && rels.store.attributes.name}
            </StripedListCell>
          </StripedListRow>
          <StripedListRow>
            <StripedListCell><b>Тип поступления</b></StripedListCell>
            <StripedListCell>
              {typeof rels.spares_type !== "undefined" && rels.spares_type.attributes.name}
            </StripedListCell>
          </StripedListRow>
          <StripedListRow>
            <StripedListCell><b>Дата добавления</b></StripedListCell>
            <StripedListCell>{moment(data.attributes.created_at).format("DD MMMM YYYY")}</StripedListCell>
          </StripedListRow>
          <StripedListRow>
            <StripedListCell><b>Статус</b></StripedListCell>
            <StripedListCell>{rels.status.attributes.name}</StripedListCell>
          </StripedListRow>
        </StripedList>


        <div className="links_with_icon__wrap" style={{alignItems: 'flex-end', justifyContent: 'space-between'}}>

          {rels.status.id == 66 &&
            <React.Fragment>
              <div
                className="link_with_icon"
                onClick={() => {
                  this.setAcceptStatus();
                }}
              >
                <AutorenewOutlinedIcon className="link_with_icon__icon"/>
                Принять на склад
              </div>
              
            </React.Fragment>
          }

          {rels.status.id == 67 &&
            <div
              className="link_with_icon"
              onClick={this.moveToOtherStore}
            >
              <ForkRightIcon className="link_with_icon__icon"/>
              Переместить
            </div>
          }
          
          {rels.status.id != 66 && <div></div>}

          <div
            className="link_with_icon"
            onClick={() => {
              this.props.pushItemToModal(
                <SparesAddForm
                  getRecord={this.props.getRecord}
                  data={data.attributes}
                />,
                'Редактировать данные',
              );
            }}
          >
            <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Редактировать данные
          </div>

        </div>

      </React.Fragment>

    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    pushItemToModal: (content, title) => dispatch({type: 'PUSH_MODAL_ITEM', payload: {title, content}}),
  }
}
export default connect(null, mapDispatchToProps)(ReportData)