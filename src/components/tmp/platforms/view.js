import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {recordWithData} from "@hocs";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import RecordData from "./record-data";
import Objects from './objects'
import History, {HistoryItem} from "porabote/history";
import moment from "moment";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

class View extends React.Component {

  render() {

    moment.lang("ru");
    const {data} = this.props

    const dicts = this.props.dicts
    const history = data.relationships.history;

    return (
      <div className="content" style={{padding: "40px"}}>

        <p style={{padding: "30px 0 10px 0", color: "#555"}}>
          <NavLink className="crumb_link" to="/platforms/feed/">
            <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
            Назад к списку
          </NavLink>
          Площадка <b>{data.attributes.ru_alias}</b>
        </p>

        <Tabs {...this.props}>

          <TabList>
            <Tab>Данные</Tab>
            <Tab>Объекты</Tab>
            <Tab>История</Tab>
          </TabList>

          <TabPanel>
            <RecordData dicts={dicts} data={data}/>
          </TabPanel>
          <TabPanel>
            <Objects getRecord={this.props.getRecord} objects={data.relationships.objects} record={data}/>
          </TabPanel>
          <TabPanel>
            <History>
              {history.map((item, index) => {
                return (
                  <HistoryItem
                    key={index}
                    msg={item.attributes.msg}
                    user={item.attributes.user_name}
                    datetime={moment(item.attributes.created_at).format("DD MMM YYYY HH:mm")}
                  />
                )
              })}
            </History>
          </TabPanel>

        </Tabs>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    ...state.platforms,
  })
}

export default connect(mapStateToProps)(recordWithData(View, {}))