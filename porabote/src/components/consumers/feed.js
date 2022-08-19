import React from "react";
import { useSelector } from "react-redux";
import {ButtonLazyLoad, Form, Button} from "porabote/form";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";
import {updateFilters} from "@components/filters/store/filters-actions";
import FeedPreloader from "../feed/feed-preloader";
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.consumers);

  const submitForm = (values) => {
    props.updateFilters(values);
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
  }

  const statuses = {
    moderate: 'Hа модерации',
    accepted: 'Подтвержден',
    declined: 'Отклонен',
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
          <FeedTopPanel
            fetchData={props.fetchData}
          />
        </div>

        <div className="content__body">

          <Grid grid-template-columns="50px 80px 90px 200px 150px 200px 120px 220px 130px 140px 100px ">

            <div className="head">
              <div>ID</div>
              <div>Принять</div>
              <div>Отклонить</div>
              <div>Лицо</div>
              <div>Формат</div>
              <div>Статус</div>
              <div>Компания</div>
              <div>Email</div>
              <div>Телефон</div>
              <div>Дата регистрации</div>
              <div>dentsu_id</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes
                const rels = record.relationships

                return (
                  <div linkTo={`/consumers/view/${attrs.id}`} key={index}>
                    <div>{attrs.id}</div>
                    <div>
                      {attrs.part_type == 'offline' &&
                        <div className="link_with_icon" onClick={() => props.acceptPart(attrs.id)}>
                          <ThumbUpOffAltIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
                        </div>
                      }
                    </div>
                    <div>
                      {attrs.part_type == 'offline' &&
                        <div className="link_with_icon" onClick={() => props.declinePart(attrs.id)}>
                          <ThumbDownAltIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
                        </div>
                      }
                    </div>
                    <div><b>{attrs.last_name} {attrs.name}</b><br/>{attrs.post_name}</div>
                    <div>
                      <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                        <TripOriginIcon style={{
                          color: (attrs.part_type == 'offline' ? '#f3355f' : '#21a63b'),
                          marginRight: '3px',
                          width: '20px',
                        }}/>
                        {attrs.part_type}
                      </div>
                    </div>
                    <div>{statuses[attrs.status]}</div>
                    <div>{attrs.company_name}</div>
                    <div><b>{attrs.email}</b></div>
                    <div><b>{attrs.phone}</b></div>
                    <div>{moment(attrs.created_at).format("DD/MM/YYYY HH:mm:ss")}</div>
                    <div>{attrs.user_id}</div>
                  </div>
                )
              })
            }
          </Grid>

          <div style={{width: '1000px', margin: '20px auto', textAlign: 'right'}}>
            <Button
              className="on-button grey-stroke_x_yellow-fill icon-excel__grey_x_white"
              type="button"
              onClick={() => {
                props.exportFeedToExcel(data);
              }}
            >Экспорт в Excel
            </Button>
          </div>

          <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>
        </div>
      </div>
    </Form>
  )
}


export default Feed;