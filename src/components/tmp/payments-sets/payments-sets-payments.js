import React from 'react'
import { connect } from 'react-redux'
import Api from '@services/api-service'
import { Button } from 'porabote/form'
import {
    StripedList,
    StripedListRow,
    StripedListCell,
    StripedDropMenu,
    StripedDropLink
} from 'porabote/striped-list';
import PaymentRepeat from './payment-repeat'
import PaymentCancel from './payment-cancel'
import CancelRequestApprove from './cancel-request-approve'
import CancelRequestDecline from './cancel-request-decline'
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import moment from 'moment'

class PaymentsSetsPayments extends React.Component {

    state = {
        loading: true,
        hasError: false
    }

    // static getDerivedStateFromError(error) {
    //     // Обновите состояние так, чтобы следующий рендер показал запасной интерфейс.
    //     return { hasError: true };
    // }
    //
    // componentDidCatch(error, info) {
    //     alert(88);
    //    // logComponentStackToMyService(info.componentStack);
    // }

    componentDidMount() {

        this.fetchData()
    }

    fetchData = (query) => {

        Api.get(`/api/payments-sets/${this.props.data.id}/relationships/payments`, {
            query: {
                include: [ 'payments.contractor', 'payments.bill', 'payments.status' ]
            }
        }).then((response) => {
            this.setState({
                data: (typeof response.data !== 'undefined') ? response.data : [],
                loading: false
            })
        })
    }

    render() {

        if (this.state.loading) return <p>Данные загружаются</p>

        // return (
        //     <div className="timeline-wrapper">
        //         <div className="timeline-item">
        //             <div className="animated-background outlined">
        //                 <div className="background-masker header-top"></div>
        //                 <div className="background-masker header-left"></div>
        //                 <div className="background-masker header-right"></div>
        //                 <div className="background-masker header-bottom"></div>
        //                 <div className="background-masker subheader-left"></div>
        //                 <div className="background-masker subheader-right"></div>
        //                 <div className="background-masker subheader-bottom"></div>
        //                 <div className="background-masker content-top"></div>
        //                 <div className="background-masker content-first-end"></div>
        //                 <div className="background-masker content-second-line"></div>
        //                 <div className="background-masker content-second-end"></div>
        //                 <div className="background-masker content-third-line"></div>
        //                 <div className="background-masker content-third-end"></div>
        //             </div>
        //         </div>
        //     </div>
        // )

        return(
            <div>

                <StripedList style={{gridTemplateColumns: '50px 50px 150px 150px 1fr 150px 190px 150px 1fr 1fr'}}>

                    <StripedListRow key="head" className="grid_list head">
                        <StripedListCell className="grid_list__item head"></StripedListCell>
                        <StripedListCell className="grid_list__item head">id</StripedListCell>
                        <StripedListCell className="grid_list__item head">статус</StripedListCell>
                        <StripedListCell className="grid_list__item head">номер счета</StripedListCell>
                        <StripedListCell className="grid_list__item head">контрагент</StripedListCell>
                        <StripedListCell className="grid_list__item head">сумма платежа</StripedListCell>
                        <StripedListCell className="grid_list__item head">принято в работу в ШГ</StripedListCell>
                        <StripedListCell className="grid_list__item head">процент оплаты</StripedListCell>
                        <StripedListCell className="grid_list__item head">вид оплаты</StripedListCell>
                        <StripedListCell className="grid_list__item head">назначение</StripedListCell>
                    </StripedListRow>

                    {this.state.data.map((item, index) => {

                        const { contractor, bill, status } = item.relationships

                        let attrs = item.attributes;

                        let shneiderStatus = typeof attrs.accept_datetime == "string" ? moment(attrs.accept_datetime).format("DD MMM YYYY HH:mm") : null

                        return(
                            <StripedListRow key={index}>
                                <StripedListCell>

                                    <StripedDropMenu>
                                        {shneiderStatus === null &&
                                            <div
                                                onClick={() => {
                                                    this.props.modalPaymentRepeat(item, this.fetchData);
                                                }}
                                            >
                                                Отправить платеж повторно
                                            </div>
                                        }
                                        <div
                                            onClick={() => {
                                                this.props.modalPaymentCancel(item, this.fetchData);
                                            }}
                                        >
                                            Отозвать платеж
                                        </div>

                                        {item.attributes.status_id == 55 &&

                                            <React.Fragment>
                                                <div
                                                    style={{display: 'flex'}}
                                                    onClick={() => { this.props.modalCancelRequestApprove(item, this.fetchData); }} >
                                                    <CheckCircleOutlineSharpIcon
                                                        style={{fontSize: '20px', color: '#2ed278', paddingRight: '10px'}}
                                                    />
                                                    Запрос на отмену платежа был принят (платёж отменён)
                                                </div>
                                                <div style={{display: 'flex'}} onClick={() => { this.props.modalCancelRequestDecline(item, this.fetchData); }} >
                                                    <CancelPresentationOutlinedIcon
                                                        style={{fontSize: '20px', color: '#fa61b1', paddingRight: '10px'}}
                                                    />
                                                    Запрос на отмену платежа был отклонен (платёж был проведён)
                                                </div>
                                            </React.Fragment>

                                        }

                                    </StripedDropMenu>                                    
                                    

                                </StripedListCell>
                                <StripedListCell>
                                    <a href={`/payments/view/${item.id}`} target="_blank">{item.id}</a>
                                </StripedListCell>
                                <StripedListCell>
                                    {status.attributes.name}
                                </StripedListCell>
                                <StripedListCell>
                                    {typeof bill.attributes != "undefined" && bill.attributes.number}
                                </StripedListCell>
                                <StripedListCell>
                                    {typeof contractor.attributes != "undefined" && contractor.attributes.name}
                                </StripedListCell>
                                <StripedListCell>{item.attributes.summa}</StripedListCell>
                                <StripedListCell>
                                    <div>
                                    {!shneiderStatus && <p>Не обработано</p>}
                                    {shneiderStatus && <p>{shneiderStatus}</p>}
                                    {item.attributes.status_id == 57 &&
                                        <p
                                            style={{
                                                color: '#000',
                                                background: '#ffd91f',
                                                fontFamily: 'Roboto Regular',
                                                padding: '3px 8px',
                                                borderRadius: '4px'
                                            }}
                                        >Платёж отправлен повторно</p>
                                    }
                                    </div>
                                </StripedListCell>
                                <StripedListCell>{item.attributes.percent_of_bill}</StripedListCell>
                                <StripedListCell>{item.attributes.pay_type}</StripedListCell>
                                <StripedListCell>{item.attributes.purpose}</StripedListCell>
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
        modalPaymentRepeat: (item, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: `Отправить платеж № ${item.id} повторно`,
                content: React.createElement(PaymentRepeat, { item, fetchData })
            }
        }),
        modalPaymentCancel: (item, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: `Запросить отмену платежа № ${item.id}`,
                content: React.createElement(PaymentCancel, {item, fetchData})
            }
        }),
        modalCancelRequestApprove: (item, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: `Запрос на отмену платежа № ${item.id} был принят (платёж отменён)`,
                content: React.createElement(CancelRequestApprove, {item, fetchData })
            }
        }),
        modalCancelRequestDecline: (item, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: `Запрос на отмену платежа № ${item.id} был отклонен (платёж был проведён)`,
                content: React.createElement(CancelRequestDecline, { item, fetchData })
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(PaymentsSetsPayments)