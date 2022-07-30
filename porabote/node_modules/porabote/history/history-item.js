import React from "react";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";


class HistoryItem extends React.Component {

    render() {

      const diff = (this.props.diff && this.props.diff !== null && this.props.diff.length > 0) ? JSON.parse(this.props.diff) : {};

        return(
            <div className="comments__item on">
                <div className="comments__item-avatar">
                    <div className="comments__item-avatar-img">

                    </div>
                </div>
                <div className="comments__item-fio">
                    <span className="comments__item-fio__sender">{this.props.user}</span>
                    <span className="comments__listener-fio hide"></span>
                </div>
                <div className="comments__item-date">
                    <time>
                        {this.props.datetime}
                    </time>
                </div>
                <div className="comments__item-title">
                  <span dangerouslySetInnerHTML={{__html: this.props.msg}}></span>

                  <StripedList key={1} style={{gridTemplateColumns: '120px 100px 140px 140px 1fr 150px 40px', marginTop: '10px'}}>

                    {Object.keys(diff).length > 0 &&
                      <StripedListRow>
                        <StripedListCell><b>Параметр</b></StripedListCell>
                        <StripedListCell><b>Значение до</b></StripedListCell>
                        <StripedListCell><b>Значение после</b></StripedListCell>
                      </StripedListRow>
                    }
                    {Object.keys(diff).map((fieldName, index) => {
                      let item = diff[fieldName];
                      return(
                        <StripedListRow key={fieldName}>
                          <StripedListCell>{fieldName}</StripedListCell>
                          <StripedListCell>{item["before"]}</StripedListCell>
                          <StripedListCell>{item["after"]}</StripedListCell>
                        </StripedListRow>
                      )
                    })}
                  </StripedList>
                </div>

                <div href="#" className="comments__item-response">
                    <div href="#" className="comments__item-response-link"></div>
                    <div href="#" className="comments__item-response-form"></div>
                </div>

            </div>
        )
    }
}

export default HistoryItem