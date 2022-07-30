import React from "react";
import {call, put, select, takeEvery} from "redux-saga/effects";
import {Form, ButtonLazyLoad, Button} from "porabote/form";
import FilterTopPreloader from "./filter-top-preloader";
import FilterLeftPreloader from "./filter-left-preloader";
import Grid from "porabote/grid";

import MenuIcon from "@material-ui/icons/Menu";

const FeedPreloader = (props) => {

  return (

    <Form
      values={{
        seekString: '',
      }}
    >

      <div className="content feed">

        <div className="content__top-filter">
          <FilterTopPreloader/>
        </div>

        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          {props.title}
        </div>

        <div className="content__filter__left">
          <FilterLeftPreloader/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px repeat(5, 200px)">
            <div className="head">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

          </Grid>

          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>
          <div className="suspense-block"></div>

        </div>
      </div>

      <ButtonLazyLoad/>
    </Form>
  )
}

export default FeedPreloader;