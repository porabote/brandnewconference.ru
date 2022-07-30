import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'porabote/tabs'
import Api from '@services/api-service'
import PaymentsSetsViewFiles from './payments-sets-view-files'
import PaymentsSetsData from './payments-sets-data'
import PaymentsSetsPayments from './payments-sets-payments'
import History, { HistoryItem } from 'porabote/history'
import Comments from 'porabote/comments'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import moment from 'moment'

class PaymentsSetsView extends React.Component {

    state = {
        loading: true,
        data: {
            relationships: {
                history: []
            }
        }
    }

    componentDidMount() {
        this.fetchRecord();
    }

    fetchRecord = () => {
        let splits = window.location.pathname.split('/')
        const id = splits[splits.length - 1]

        if (typeof id == "undefined") return;

        Api.get(`/api/payments-sets/get/${id}/`, {
            query: {
                include: [ 'history', 'payments' ]
            }
        }).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : [],
                loading: false
            })
        })
    }

    render() {

        if (this.state.loading) return <p>Данные записи загружаются</p>

        return(
            <div className="content" style={{padding: '40px'}}>

                <p style={{padding: '30px 0 10px 0', color: '#555'}}>
                    <NavLink className="crumb_link" to="/payments-sets/feed/">
                        <ArrowRightRoundedIcon style={{fontSize: '24px', marginRight: '2px', top: '7px', position: 'relative'}}/>
                        Назад к списку
                    </NavLink>
                    План оплат №
                    {this.state.data &&
                        <React.Fragment>
                            {this.state.data.id} / {this.state.data.date_created} -
                            <span style={{color: '#bababa'}}>
                                Неделя {this.state.data.week}
                            </span>
                        </React.Fragment>
                    }
                </p>

                <Tabs {...this.props}>

                    <TabList>
                        <Tab>Платежи</Tab>
                        <Tab>Данные</Tab>
                        <Tab>История</Tab>
                        <Tab>Комментарии</Tab>
                    </TabList>

                    <TabPanel>
                        <PaymentsSetsPayments
                            data={this.state.data}
                        />
                    </TabPanel>
                    <TabPanel>
                        <PaymentsSetsData dicts={this.state.dicts} data={this.state.data} />
                    </TabPanel>
                    <TabPanel>
                        <History>
                            {
                                this.state.data.relationships.history.map((item, index) => {
                                    return(
                                        <HistoryItem
                                            key={index}
                                            msg={item.attributes.msg}
                                            user={item.attributes.user_name}
                                            datetime={moment(item.attributes.created_at).format("DD MMM YYYY HH:mm")}
                                        />
                                      )
                                })
                            }
                        </History>
                    </TabPanel>
                    <TabPanel>
                        <Comments
                            url={`/api/payments-sets/${this.state.data.id}/relationships/comments`}
                            recordId={this.state.data.id}
                            modelAlias="payments-sets"
                            addUrl="/api/payments-sets/method/addComment/"
                        />
                    </TabPanel>

                </Tabs>

            </div>
        )
    }
}

export default PaymentsSetsView