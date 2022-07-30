import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'porabote/tabs'
import Api from '@services/api-service'
import BusinessEventsViewFiles from './business-events-view-files'
import BusinessEventsData from './business-events-data'
import History, { HistoryItem } from 'porabote/history'
import moment from 'moment'
import Comments from 'porabote/comments'
import Observers from './observers'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

class BusinessEventsView extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.fetchRecord();
    }

    fetchRecord = () => {
        let splits = window.location.pathname.split('/')
        const id = splits[splits.length - 1]

        if (typeof id == "undefined") return;

        Api.get(`/api/business-events/get/${id}/`, {
            query: {
                //include: [ 'files', 'departments', 'types', 'history', 'user', 'object' ]
            }
        }).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : []
            })
        })
    }

    render() {

        if (typeof this.state.data.id == "undefined") return <p>Данные записи загружаются</p>

        return(
            <div className="content" style={{padding: '40px'}}>

                <p style={{padding: '30px 0 10px 0', color: '#555'}}>
                    <NavLink className="crumb_link" to="/business-events/feed/">
                        <ArrowRightRoundedIcon style={{fontSize: '24px', marginRight: '2px', top: '7px', position: 'relative'}}/>
                        Назад к списку
                    </NavLink>
                    Бизнес-событие <b>{this.state.data.attributes.name}</b> </p>

                <Tabs {...this.props}>

                    <TabList>
                        <Tab>Наблюдатели по умолчанию</Tab>
                    </TabList>

                    <TabPanel>
                        <Observers
                            model_alias="business-events"
                            record_id={this.state.data.id}
                        />
                    </TabPanel>

                </Tabs>

            </div>
        )
    }
}

export default BusinessEventsView