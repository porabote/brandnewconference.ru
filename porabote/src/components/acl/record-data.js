import React, { Component } from 'react'
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list'
import moment from 'moment'

class RecordData extends Component {

    render() {

        const { data } = this.props

        return(
            <StripedList style={{gridTemplateColumns: '150px 1fr'}}>
              <StripedListRow>
                <StripedListCell>ФИО</StripedListCell>
                <StripedListCell>
                  {data.attributes.last_name} {data.attributes.name}
                </StripedListCell>
              </StripedListRow>
            </StripedList>
        )
    }

}

export default RecordData