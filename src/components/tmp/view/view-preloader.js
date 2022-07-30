import React from "react";
import {
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";

const ViewPreloader = (props) => {

  let match = useRouteMatch();

  return(
    <div className="content" style={{padding: "40px"}}>

      <p style={{padding: "30px 0 10px 0", color: "#555"}}>

        Загрузка
      </p>

      <Tabs>

        <TabList>
          <Tab>Загрузка данных</Tab>
          <Tab> ... </Tab>
          <Tab> ... </Tab>
        </TabList>


        <TabPanel>
          <div style={{minHeight: '70vh'}}>
            <div className="suspense-block"></div>
            <div className="suspense-block"></div>
            <div className="suspense-block"></div>
            <div className="suspense-block"></div>
            <div className="suspense-block"></div>
          </div>
        </TabPanel>
        <TabPanel>
          <div></div>
        </TabPanel>

      </Tabs>

    </div>
  );
}

export default ViewPreloader;