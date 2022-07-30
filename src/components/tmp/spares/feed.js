import React from "react";
import {useSelector} from "react-redux";
import {Form, ButtonLazyLoad} from "porabote/form";
import {fetchData} from "./store/spares-actions";
import {updateFilters} from "@components/filters/store/filters-actions";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {feedWithData} from "@hocs";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import ContentPanel from "./content-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.spares);

  const submitForm = (values) => {
    props.updateFilters(values);
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title="Запчасти"/>;
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
          Запчасти (склад)
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          <ContentPanel fetchData={fetchData}/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="50px 32px 100px 240px 170px 80px 80px 160px 140px">

            <div className="head">
              <div>ID</div>
              <div></div>
              <div>Статус</div>
              <div>Название</div>
              <div>Артикул</div>
              <div>Кол-во</div>
              <div>Ед. изм</div>
              <div>Склад</div>
              <div>Дата добавления</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes
                const rels = record.relationships
                const store = (typeof rels.store !== "undefined") ? rels.store.attributes : {};

                return (
                  <div linkTo={`/spares/view/${attrs.id}`} key={attrs.id}>
                    <div>
                      {attrs.id}
                    </div>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}>
                        {attrs.status_id == 66 &&
                          <AccessTimeIcon style={{fontSize: '18px', marginLeft: '6px', color: '#21c782'}}/>
                        }
                      </div>
                    </div>
                    <div>{rels.status.attributes.name}</div>
                    <div>
                      {attrs.name}
                    </div>
                    <div>{attrs.vendor_code}</div>
                    <div>{attrs.quantity}</div>
                    <div>{attrs.unit || ''}</div>
                    <div>{store.name || ''}</div>
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