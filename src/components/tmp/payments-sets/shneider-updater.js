import React from 'react'
import Api from '@services/api-service'
import Loader from 'porabote/loader'
import {
    StripedList,
    StripedListRow,
    StripedListCell
} from 'porabote/striped-list';

class ShneiderFeedback extends React.Component {

    state = {
        data: [],
        loading: true
    }

    componentDidMount() {

        Api.get(`/api/payments-sets/method/getPaymentsFeedbacks`, {
        }).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : [],
                loading: false
            })
        })

    }

    render() {

        if (this.state.loading) return <Loader/>

        return(
            <div>

                <StripedList style={{gridTemplateColumns: '150px 290px 350px'}}>

                    <StripedListRow key="head" className="grid_list head">
                        <StripedListCell className="grid_list__item head">№ платежа</StripedListCell>
                        <StripedListCell className="grid_list__item head">GUID</StripedListCell>
                        <StripedListCell className="grid_list__item head">Принято в работу</StripedListCell>
                    </StripedListRow>

                    {
                        Object.keys(this.state.data).map((key, index) => {

                            let payment = this.state.data[key];
                            return(
                                <StripedListRow key={index} className="grid_list head">
                                    <StripedListCell className="grid_list__item head">
                                        <a target="_blank" href={`/payments/view/${payment.id}`}>
                                            {payment.id}
                                        </a>
                                    </StripedListCell>
                                    <StripedListCell className="grid_list__item head">{payment.guid}</StripedListCell>
                                    <StripedListCell className="grid_list__item head">{payment.accept_datetime}</StripedListCell>
                                </StripedListRow>
                            )
                        })
                    }

                </StripedList>

            </div>
        )
    }
}

export default ShneiderFeedback