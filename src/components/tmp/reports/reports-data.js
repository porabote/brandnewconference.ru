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

        return(
            <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
                <StripedListRow>
                    <StripedListCell>Объект</StripedListCell>
                    <StripedListCell>
                        {typeof data.relationships.object !== "undefined" &&
                            data.relationships.object.attributes.name
                        }</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Тип отчета</StripedListCell>
                    <StripedListCell>
                        {typeof data.relationships.types !== "undefined" &&
                            data.relationships.types.attributes.name
                        }</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>На дату</StripedListCell>
                    <StripedListCell>{moment(data.attributes.date_period).format("DD MMMM YYYY")}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Комментарий</StripedListCell>
                    <StripedListCell>{data.attributes.comment}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Дата создания</StripedListCell>
                    <StripedListCell>{moment(data.attributes.created_at).format("DD MMMM YYYY hh:mm")}</StripedListCell>
                </StripedListRow>
            </StripedList>
        )
    }

}

export default ReportData