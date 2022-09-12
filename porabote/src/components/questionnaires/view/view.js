import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import RecordData from "./record-data";
import ChildrenRecords from "./children-records";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import QuestionnairesVariants from "./questionnaires-variants";

const View = (props) => {

  moment.lang("ru");
  const {data} = props;

  return (
    <div className="content" style={{padding: "40px"}}>

      <Tabs {...props}>

        <TabList>
          <Tab>Данные</Tab>
          <Tab>Варианты ответа</Tab>
        </TabList>


        <TabPanel>
          <RecordData data={data} {...props}/>
        </TabPanel>
        <TabPanel>
          <QuestionnairesVariants data={data} {...props}/>
        </TabPanel>
      </Tabs>

    </div>
  )

}


export default View;