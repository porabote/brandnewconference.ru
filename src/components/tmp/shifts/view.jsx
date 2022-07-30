import React from "react";
import {NavLink} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import { withDataFetching } from "@hocs"
import RecordData from "./record-data";
import moment from "moment";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import ShiftsCalendar from "./shifts-calendar";
import UsersList from "./users-list";

const View = (props) => {

  moment.lang("ru");

  const {
    attrs,
    rels,
    dicts,
  } = props;

  const {
    platform_id,
    head_user,
  } = rels;

  return (
    <div className="content" style={{padding: "40px"}}>

      <p style={{padding: "0px 0 10px 0", color: "#555"}}>
        <NavLink className="crumb_link" to="/shifts/feed/">
          <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
          Назад к списку
        </NavLink>
        <b>Вахта {attrs.title}</b> 
        <span style={{color: "#bababa"}}> </span>
      </p>

      <Tabs {...props}>

        <TabList>
          <Tab>Данные</Tab>
          <Tab>Календарь</Tab>
          <Tab>Сотрудники</Tab>
        </TabList>

        <TabPanel>
          <RecordData { ...props }/>
        </TabPanel>
        <TabPanel>
          <ShiftsCalendar { ...props }/>
        </TabPanel>
        <TabPanel>
          <UsersList { ...props }/>
        </TabPanel>

      </Tabs>

    </div>
  );
}

export default (props) => {
  return withDataFetching(View, {...props});
};