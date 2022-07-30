import React, { Component } from 'react'
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list'
import moment from 'moment'

class RecordData extends Component {

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
                <StripedListCell>Название на русском</StripedListCell>
                <StripedListCell>
                  {data.attributes.ru_alias}
                </StripedListCell>
              </StripedListRow>
              <StripedListRow>
                <StripedListCell>Название на английском</StripedListCell>
                <StripedListCell>
                  {data.attributes.en_alias}
                </StripedListCell>
              </StripedListRow>
            </StripedList>
        )
    }

}

export default RecordData