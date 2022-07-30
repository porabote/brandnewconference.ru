import React from 'react'
import SparesAddObserver from './report-add-observer-form'
import ObserverUnsubscribe from './observer-unsubscribe'
import Api from '@services/api-service'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import PersonAdd from '@material-ui/icons/PersonAdd';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list';

class Observers extends React.Component {

    state = {
        data: [],
        loading: true
    }

    componentDidMount() {
        this.fetchRecord();
    }

    fetchRecord = () => {

        let splits = window.location.pathname.split('/')
        const id = splits[splits.length - 1]

        if (typeof id == "undefined") return;

        this.setState({
            loading: true
        })

        Api.get(`/api/observers/get/`, {
            query: {
                include: [ 'user', 'event' ],
                whereIn: {
                    'business_event_id': [1, 2, 3]
                },
                where: {
                    '=': {
                        'entity_id': id
                    }
                }
            }
        }).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : [],
                loading: false
            })
        })
    }

    render() {

        if (this.state.loading) return <div className="empty-data">Данные загружаются</div>

        return(
            <div>
                <div className="links_with_icon">
                    {/*<div className="link_with_icon">*/}
                    {/*    <AddIcon className="link_with_icon__icon" />*/}
                    {/*    Стать наблюдателем*/}
                    {/*</div>*/}
                    <div
                        className="link_with_icon"
                        onClick={() => {
                            this.props.pushItemToModal(
                                React.createElement(SparesAddObserver, {
                                    record_id: this.props.record_id,
                                    fetchRecord: this.fetchRecord
                                }),
                                'Добавить наблюдателя',
                            );
                        }}
                    >
                        <PersonAdd className="link_with_icon__icon" />
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
                                <StripedListCell>
                                    <RemoveCircleOutlineIcon
                                        style={{
                                            color: '#444',
                                            cursor: 'pointer'
                                        }}
                                        onClick={(e) => {
                                            this.props.pushItemToModal(
                                                React.createElement(ObserverUnsubscribe, {
                                                    user_id: observer.relationships.user.id,
                                                    record_id: this.props.record_id,
                                                    fetchRecord: this.fetchRecord
                                                }),
                                                'Пользователь подписан на события',
                                            );
                                            //this.deleteItem(observer.id)
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

const mapDispatchToProps = (dispatch) => {
    return {
        pushItemToModal: (content, title) => dispatch({ type: 'PUSH_MODAL_ITEM', payload: { title, content } }),
    }
}
export default connect(null, mapDispatchToProps)(Observers)