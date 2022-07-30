import React, {PureComponent} from 'react';
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list';
import PropTypes from 'prop-types';
import moment from 'moment'

class Remains extends PureComponent {
  render() {

    const remains = this.props.data.relationships.remains || [];

    return (
      <div>

        <StripedList style={{gridTemplateColumns: '500px 200px 1fr'}}>

          <StripedListRow>
            <StripedListCell><b>Комментарий</b></StripedListCell>
            <StripedListCell><b>Дата</b></StripedListCell>
            <StripedListCell><b>Внес</b></StripedListCell>
          </StripedListRow>

          {remains.map((item, index) => {
            return(
              <StripedListRow key={index}>
                <StripedListCell dangerouslySetInnerHTML={{__html: item.attributes.comment}}></StripedListCell>
                <StripedListCell>
                  {moment(item.attributes.created_at).format("DD MMM YYYY HH:mm")}
                </StripedListCell>
                <StripedListCell>
                  {item.attributes.user_name}
                </StripedListCell>
              </StripedListRow>
            )

          })}

        </StripedList>

      </div>
    );
  }
}

Remains.propTypes = {};

export default Remains;