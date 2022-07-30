import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {recordWithData} from "@hocs";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import RecordData from "./record-data";
import History, {HistoryItem} from "porabote/history";
import moment from "moment";
import Comments from "porabote/comments";
import { ObserversByRecord } from "../observers";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import EngineHours from "./engine-hours";
import Repairs from "./repairs";
import Accidents from "./accidents";

class View extends React.Component {

  render() {

    moment.lang("ru");
    const {data} = this.props

    const dicts = this.props.dicts
    const history = data.relationships.history || [];
    const user = data.relationships.user.attributes;

    return (
      <div className="content" style={{padding: "40px"}}>

        <p style={{padding: "0px 0 10px 0", color: "#555"}}>
          <NavLink className="crumb_link" to="/equipments/feed/">
            <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
            Назад к списку
          </NavLink>
          Оборудование {data.attributes.name} -
          <span style={{color: "#bababa"}}> от {user.last_name} {user.name}</span></p>

        <Tabs {...this.props}>

          <TabList>
            <Tab>Краткая информация</Tab>
            <Tab>Наработка</Tab>
            <Tab>ТО/Ремонт</Tab>
            <Tab>Авария</Tab>
            {/*<Tab>Запчасти</Tab>*/}
            <Tab>История</Tab>
            <Tab>Комментарии</Tab>
            <Tab>Наблюдатели</Tab>
          </TabList>

          <TabPanel>
            <RecordData dicts={dicts} data={data} getRecord={this.props.getRecord}/>
          </TabPanel>
          <TabPanel>
            <EngineHours record={data} getRecord={this.props.getRecord} />
          </TabPanel>
          <TabPanel>
            <Repairs record={data} getRecord={this.props.getRecord}/>
          </TabPanel>
          <TabPanel>
            <Accidents record={data} getRecord={this.props.getRecord}/>
          </TabPanel>
          {/*<TabPanel>Запчасти</TabPanel>*/}
          <TabPanel>
            <History>
              {history.map((item, index) => {
                return (
                  <HistoryItem
                    key={index}
                    msg={item.attributes.msg}
                    user={item.attributes.user_name}
                    datetime={moment(item.attributes.created_at).format("DD MMM YYYY HH:mm")}
                    diff={item.attributes.diff}
                  />
                )
              })}
            </History>
          </TabPanel>
          <TabPanel>
            <Comments
              url={`/api/equipments/${data.id}/relationships/comments`}
              recordId={data.id}
              modelAlias="equipments"
              addUrl="/api/equipments/method/addComment/"
            />
          </TabPanel>
          <TabPanel>
            <ObserversByRecord
              businessEventIds={[11]}
              recordId={data.id}
            />
          </TabPanel>

        </Tabs>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    ...state.equipments,
  })
}

export default connect(mapStateToProps)(recordWithData(View, {}))