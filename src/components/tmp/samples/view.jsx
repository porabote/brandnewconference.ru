import React from "react";
import {NavLink} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import {withDataFetching} from "@hocs"
import RecordData from "./record-data";
import History, {HistoryItem} from "porabote/history";
import moment from "moment";
import Comments from "porabote/comments";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import AcceptsList from "@components/accept-lists";

const View = (props) => {

  moment.lang("ru");

  const {
    attrs,
    rels,
    dicts,
  } = props;

  const {
    steps,
    status,
    user,
    history,
    files,
    comments,
    type,
  } = rels;

  return (
    <div className="content" style={{padding: "40px"}}>

  <p style={{padding: "0px 0 10px 0", color: "#555"}}>
  <NavLink className="crumb_link" to="/tickets/feed/">
  <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
  Назад к списку
  </NavLink>
  Билет {attrs.name} -
    <span style={{color: "#bababa"}}> от {user.attributes.name} {user.attributes.post_name}</span>
  </p>

  <Tabs {...props}>

  <TabList>
    <Tab>Краткая информация</Tab>
  <Tab>Акцепт-лист</Tab>
  <Tab>История</Tab>
  <Tab>Комментарии</Tab>
  </TabList>

  <TabPanel>
  <RecordData dicts={dicts} data={attrs}/>
  </TabPanel>
  <TabPanel>
  <AcceptsList
    model="Tickets"
  foreignKey={attrs.id}
  mode="building"
  />
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
        diff={item.attributes.diff}
        />
      )
      })}
  </History>
  </TabPanel>
  <TabPanel>
  <Comments
    url={`/api/tickets/${attrs.id}/relationships/comments`}
  recordId={attrs.id}
  modelAlias="tickets"
  addUrl="/api/tickets/method/addComment/"
    />
    </TabPanel>

    </Tabs>

    </div>
);
}

export default (props) => {
  return withDataFetching(View, {...props});
}