import React from "react";
import { useSelector } from "react-redux";
import {ButtonLazyLoad, Form} from "porabote/form";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {feedWithData} from "@hocs";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";
import {updateFilters} from "@components/filters/store/filters-actions";
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.users);

  const submitForm = (values) => {
    props.updateFilters(values);
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
  }

  return (

    <Form
      values={filter}
      submitForm={(values) => {
        submitForm(values);
      }}
    >
      <div className="content feed">

        <div className="content__top-filter">
          <FilterTop/>
        </div>

        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          {title}
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          <FeedTopPanel fetchData={props.fetchData}/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px 1fr 170px 180px">

            <div className="head">
              <div>ID</div>
              <div>Название</div>
              <div>Объект</div>
              <div>Дата добавления</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes
                const rels = record.relationships

                return (
                  <div linkTo={`/users/view/${attrs.id}`} key={attrs.id}>
                    <div>{attrs.id}</div>
                    <div>{attrs.last_name} {attrs.name}</div>
                    {/*<div>{rels.object.attributes.name}</div>*/}
                    <div>{moment(attrs.created_at).format("DD/MM/YYYY")}</div>
                  </div>
                )
              })
            }
          </Grid>
          <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>
        </div>
      </div>
    </Form>
  )
}


export default Feed;