import React, { Component } from 'react'
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list'
import moment from 'moment'

class ReportData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    render() {

        const { data, dicts } = this.props

        if(data === null) {
            return(
                <StripedList>
                    <StripedListRow>
                        <StripedListCell>Данные не загружены</StripedListCell>
                    </StripedListRow>
                </StripedList>
            )
        }

        const { payments } = data.relationships

        let summaRUR = 0;
        payments.map(payment => {
            summaRUR += parseInt(payment.attributes.summa)
        })

        let objects = '';
        let objectsList = {};

        payments.map(payment => {

            if (
                typeof payment.relationships.object != "undefined"
                && typeof objectsList[payment.relationships.object.attributes.name] == "undefined"
            ) {
                objects += `${payment.relationships.object.attributes.name}; `
                objectsList[payment.relationships.object.attributes.name] = payment.relationships.object.attributes.name;
            }
        })

        return(
            <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
                <StripedListRow>
                    <StripedListCell>Номер</StripedListCell>
                    <StripedListCell>{data.id}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Дата платежа</StripedListCell>
                    <StripedListCell>{moment(data.attributes.date_payment).format("DD/MM/YYYY")}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Курс EURO</StripedListCell>
                    <StripedListCell>
                        {data.attributes.rate_euro}
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Курс USD</StripedListCell>
                    <StripedListCell>
                        {data.attributes.rate_usd}
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Сумма RUR</StripedListCell>
                    <StripedListCell>
                        {summaRUR}
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Объекты</StripedListCell>
                    <StripedListCell>
                        {objects}
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Комментарий</StripedListCell>
                    <StripedListCell>{data.attributes.comment}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Создано</StripedListCell>
                    <StripedListCell>{moment(data.attributes.date_created).format("DD/MM/YYYY")}</StripedListCell>
                </StripedListRow>
            </StripedList>
        )
    }

}

export default ReportData