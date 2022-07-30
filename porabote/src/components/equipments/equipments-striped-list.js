import React, { Component } from 'react'
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list'

class EquipmentsStripedList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    componentDidMount() {
        // paymentsSetService.get(1)
        //     .then((resp) => {
        //         this.setState({
        //             data: resp.data
        //         })
        //     })
    }

    render() {

        const { data } = this.state

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
                    <StripedListCell>СКРУ</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Представительство</StripedListCell>
                    <StripedListCell>
                        {typeof data.department !== "undefined" &&
                            <span>data.department.name</span>
                        }
                    </StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Тип отчета</StripedListCell>
                    <StripedListCell>Еженедельный</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>На дату</StripedListCell>
                    <StripedListCell>{data.date_period}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Комментарий</StripedListCell>
                    <StripedListCell>{data.comment}</StripedListCell>
                </StripedListRow>
                <StripedListRow>
                    <StripedListCell>Дата загрузки</StripedListCell>
                    <StripedListCell>{data.date_created}</StripedListCell>
                </StripedListRow>
            </StripedList>
        )
    }

}

export default EquipmentsStripedList