import React from 'react'
import BusinessEventsAddObserver from './business-events-add-observer-form'
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

        Api.get(`/api/observers-default/get/`, {
            query: {
                include: [ 'user' ],
                where: {
                    'business_event_id': id
                }
            }
        }).then((data) => {console.log(data)
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : [],
                loading: false
            })
        })
    }

    deleteItem = (id) => {

        Api.get(
            `/api/observers-default/delete/${id}`
        ).then((data) => {
            this.fetchRecord();
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
                            this.props.pushModalItem(this.props.record_id, this.fetchRecord);
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
                                    {observer.relationships.user.attributes.name}
                                </StripedListCell>
                                <StripedListCell>
                                    <RemoveCircleOutlineIcon
                                        style={{
                                            color: '#444',
                                            cursor: 'pointer'
                                        }}
                                        onClick={(e) => {
                                            this.deleteItem(observer.id)
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
        pushModalItem: (record_id, fetchRecord) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: 'Добавить наблюдателя',
                content: React.createElement(BusinessEventsAddObserver, {record_id, fetchRecord})
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(Observers)