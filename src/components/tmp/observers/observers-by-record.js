import React from 'react'
import AddObserver from '@components/observers/add-observer-form'
import ObserverUnsubscribe from '@components/observers/observer-unsubscribe'
import Api from '@services/api-service'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PersonAdd from '@material-ui/icons/PersonAdd';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AlarmOnOutlinedIcon from '@material-ui/icons/AlarmOnOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list';

class ObserversByRecord extends React.Component {

  state = {
    data: [],
    loading: true
  }

  componentDidMount() {
    this.fetchRecord();
  }

  fetchRecord = () => {

    this.setState({
      loading: true
    })

    Api.get(`/api/observers/get/`, {
      query: {
        include: [ 'user', 'event' ],
        whereIn: {
          'business_event_id': this.props.businessEventIds
        },
        where: {
          'entity_id': this.props.recordId
        }
      }
    }).then((data) => {
      this.setState({
        data: (typeof data.data !== 'undefined') ? data.data : [],
        loading: false
      })
    })
  }

  unsubscribe = (params = {entity_id, event_ids, user_ids}) => {

    Api.get(`/api/observers/method/unsubscribe/`, {
      query: params
    }).then((data) => {
      this.fetchRecord()
    })
  }

  selfSubscribe = () => {
    Api.get(
      `/api/observers/method/subscribe/`,
      {
        query: {
          user_ids: [this.props.auth.user.id],
          event_ids: this.props.businessEventIds,
          entity_id: this.props.recordId,
        },
      }
    ).then((data) => {
      this.fetchRecord();
    })
  }

  render() {

    if (this.state.loading) return <div className="empty-data">Данные загружаются</div>

    let isUserSubscribed = false;
    for (const [key, observer] of this.state.data.entries()) {
      if (observer.relationships.user.id == this.props.auth.user.api_id) {
        isUserSubscribed = true;
        break;
      }
    };

    return(
      <div>
        <div className="links_with_icon__wrap">

          <div
            className="link_with_icon"
            onClick={() => {
              if (isUserSubscribed) {
                this.unsubscribe({
                  entity_id: this.props.recordId,
                  event_ids: this.props.businessEventIds,
                  user_ids: [this.props.auth.user.api_id],
                });
              } else {
                this.selfSubscribe();
              }
            }}
          >
            <AlarmOnOutlinedIcon className="link_with_icon__icon" />
            {isUserSubscribed ? 'Отписаться' : 'Подписаться'}
          </div>

          <div
            className="link_with_icon"
            onClick={() => {
              this.props.pushItemToModal(
                <AddObserver
                  entity_id={this.props.recordId}
                  event_ids={this.props.businessEventIds}
                  fetchRecord={this.fetchRecord}
                />,
                'Добавить наблюдателя',
              );
            }}
          >
            <AddIcon style={{marginRight: '3px'}} />
            Добавить наблюдателя
          </div>

        </div>

        <StripedList style={{gridTemplateColumns: '450px 1fr'}}>
          {this.state.data.map((observer, index) => {

            return(
              <StripedListRow key={index}>
                <StripedListCell>
                  {observer.relationships.user.attributes.name} - {observer.relationships.event.attributes.name}
                </StripedListCell>
                <StripedListCell className="grid_list__item center">
                  <RemoveCircleIcon
                    className="link_with_icon grey"
                    onClick={(e) => {
                      this.unsubscribe({
                        entity_id: this.props.recordId,
                        event_ids: this.props.businessEventIds,
                        user_ids: [observer.relationships.user.id],
                      })
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
export default connect(mapStateToProps, mapDispatchToProps)(ObserversByRecord)