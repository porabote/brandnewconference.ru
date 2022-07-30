import React from 'react'
import AddObserver from '@components/observers/add-observer-form'
import ObserverUnsubscribe from '@components/observers/observer-unsubscribe'
import Api from '@services/api-service'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddObject from "./add-object"
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';

import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list';

class Objects extends React.Component {

  state = {
    data: [],
    loading: true,
    kindList: {
      self: "Базовый",
      rent: "Аренда",
      store: "Склад",
      hole: "Скважина",
    },
  }

  deleteObject = (params = {entity_id, event_ids, user_ids}) => {

    // Api.get(`/api/objects/method/unsubscribe/`, {
    //   query: params
    // }).then((data) => {
    //   this.props.fetchRecord()
    // })
  }

  render() {

    return(
      <div>
        <div className="links_with_icon__wrap">

          <div
            className="link_with_icon"
            onClick={() => {
              this.props.pushItemToModal(
                <AddObject getRecord={this.props.getRecord} platformId={this.props.record.id}/>,
                'Добавить объект',
              );
            }}
          >
            <AddIcon style={{marginRight: '3px'}} />
            Добавить объект
          </div>

        </div>

        <StripedList style={{gridTemplateColumns: '250px 100px 1fr 170px 40px'}}>

          <StripedListRow>
            <StripedListCell><b>Название</b></StripedListCell>
            <StripedListCell><b>Тип</b></StripedListCell>
            <StripedListCell><b>Адрес</b></StripedListCell>
            <StripedListCell><b>Родитель</b></StripedListCell>
            <StripedListCell><b></b></StripedListCell>
          </StripedListRow>

          {this.props.objects.map((object, index) => {

            return(
              <StripedListRow key={index}>
                <StripedListCell>
                  {object.attributes.name}
                </StripedListCell>
                <StripedListCell>
                  {this.state.kindList[object.attributes.kind]}
                </StripedListCell>
                <StripedListCell>
                  {object.attributes.address}
                </StripedListCell>
                <StripedListCell>
                  {typeof object.relationships.parent != "undefined" && object.relationships.parent.attributes.name}
                </StripedListCell>
                <StripedListCell className="grid_list__item center">
                  <EditIcon
                    className="link_with_icon"
                    onClick={(e) => {
                      this.props.pushItemToModal(
                        <AddObject data={object.attributes} getRecord={this.props.getRecord} platformId={this.props.record.id}/>,
                        "Корректировка данных",
                      );
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

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushItemToModal: (content, title) => dispatch({ type: 'PUSH_MODAL_ITEM', payload: { title, content } }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Objects)