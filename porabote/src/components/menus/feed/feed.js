import React from "react";
import { useSelector } from "react-redux";
import {ButtonLazyLoad, Form} from "porabote/form";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";
import {updateFilters} from "@components/filters/store/filters-actions";
import FeedPreloader from "@components/feed/feed-preloader";

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.menus);

  const submitForm = (values) => {
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
          <FilterTop dicts={props.dicts}/>
        </div>

        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          {title}
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          <FeedTopPanel
            dicts={props.dicts}
            fetchData={props.fetchData}
            addRecord={props.addRecord}
          />
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px 200px 200px 80px 200px 80px 80px 80px">

            <div className="head">
              <div>ID</div>
              <div>Название</div>
              <div>Ссылка</div>
              <div>ACO ID</div>
              <div>Status</div>
              <div>parent_id</div>
              <div>lft</div>
              <div>rght</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes;
                const rels = record.relationships;

                return (
                  <div linkTo={`/menus/view/${attrs.id}`} key={index}>
                    <div>{attrs.id}</div>
                    <div><b>{attrs.name}</b></div>
                    <div>{attrs.link}</div>
                    <div>{attrs.aco_id}</div>
                    <div>{attrs.flag}</div>
                    <div>{attrs.parent_id}</div>
                    <div>{attrs.lft}</div>
                    <div>{attrs.rght}</div>
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