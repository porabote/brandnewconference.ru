import React from "react";
import {connect} from "react-redux";
import { Form, ButtonLazyLoad } from "porabote/form";
import { updateFilters } from "@components/filters/store/filters-actions";
import {fetchFeedData} from "./store/platforms-actions";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {feedWithData} from "@hocs";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";

class Feed extends React.Component {

  submitForm = (values) => {
    this.props.updateFilters(values, "equipments");
    this.props.fetchFeedData();
  }

  render() {

    const {data, dicts} = this.props

    return (

      <Form
        values={this.props.filter}
        submitForm={(values) => {
          this.submitForm(values);
        }}
      >

      <div className="content feed">

        <div className="content__top-filter">
          <FilterTop/>
        </div>

        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          {this.props.title}
        </div>

        <div className="content__filter__left">
          <FilterLeft
            requestDicts={this.props.requestDicts}
            {...this.props.dicts}
            dictsRequired={this.props.dictsRequired}
          />
        </div>

        <div className="content__tools_panel">
          <FeedTopPanel fetchData={this.fetchData}/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px 1fr 170px 180px">

            <div className="head">
              <div>ID</div>
              <div>Название</div>
              <div>Дата добавления</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes
                const rels = record.relationships

                return (
                  <div linkTo={`/platforms/view/${attrs.id}`} key={record.id}>
                    <div>{attrs.id}</div>
                    <div>{attrs.ru_alias}</div>
                    <div>{moment(attrs.created_at).format("DD/MM/YYYY")}</div>
                  </div>
                )
              })
            }
          </Grid>

        </div>
      </div>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilters: (data, storeAlias) => {
      dispatch(updateFilters(data, storeAlias));
    },
    fetchFeedData: () => {
      dispatch(fetchFeedData());
    },
  }
}

export default connect(null, mapDispatchToProps)(feedWithData(Feed, {storeAlias: "platforms"}));