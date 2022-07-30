import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import {withDataFetching} from "@hocs"
import RecordData from "./record-data";
import Tickets from "./tickets";
import History, {HistoryItem} from "porabote/history";
import moment from "moment";
import Comments from "porabote/comments";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import AcceptsList from "@components/accept-lists";
import Files from "./files";

const View = (props) => {

  let [tickets, setTickets] = useState([]);

  useEffect(() => {
    props.getTickets(setTickets);
  }, []);

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
        Заявка на приобритение билетов № {attrs.id} -
        <span style={{color: "#bababa"}}> от {user.attributes.name} {user.attributes.post_name}</span>
      </p>

      <Tabs {...props}>

        <TabList>
          <Tab>Данные</Tab>
          <Tab>Билеты</Tab>
          <Tab>Акцепт-лист</Tab>
          <Tab>История</Tab>
          <Tab>Комментарии</Tab>
          <Tab>Файлы</Tab>
        </TabList>

        <TabPanel>
          <RecordData dicts={dicts} {...props}/>
        </TabPanel>
        <TabPanel>
          <Tickets setTickets={setTickets} tickets={tickets} dicts={dicts} data={attrs} {...props}/>
        </TabPanel>
        <TabPanel>
          <AcceptsList
            model="TicketsRequests"
            foreignKey={attrs.id}
            eventsCallbackUrl={`/api/ticketsRequests/method/acceptListEventsCallback/`}
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
            modelAlias="TicketsRequests"
            addUrl="/api/tickets-requests/method/addComment/"
          />
        </TabPanel>

        <TabPanel>
          <Files
            fetchData={props.fetchData}
            record_id={attrs.id}
            model_alias="TicketsRequests"
            files={files}
          />
        </TabPanel>
      </Tabs>

    </div>
  );
}

export default (props) => {
  return withDataFetching(View, {...props});
};