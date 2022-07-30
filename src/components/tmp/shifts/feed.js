import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { ButtonLazyLoad, Form } from "porabote/form";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FilterTop from "./filter-top";
import {updateFilters} from "@components/filters/store/filters-actions";
import FeedPreloader from "@components/feed/feed-preloader";
import MenuIcon from "@material-ui/icons/Menu";
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.shifts);

  const submitForm = (values) => {
    props.updateFilters(values);
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
  }

  const statuses = {
    invited: 'Приглашён',
    active: 'Активен',
    fired: 'Уволен',
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
          <div>
                    <span
                      onClick={() => {
                        props.add();
                      }}
                      className="button-drop"
                    >
                        Добавить
                    </span>
          </div>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="1fr 260px 100px 160px 1fr">

            <div className="head">
              <div>Наименование</div>
              <div>Руководитель</div>
              <div>Статус</div>
              <div>Кол. сотрудников</div>
              <div>Площадка</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes;
                const { head_user, platform, users } = record.relationships;

                let statusColor = '#999999';
                if (attrs.periods) {
                  let periods = attrs.periods;
                  periods = JSON.parse(periods);
                  let now = moment().format('Y-MM-DD');
                  let activePeriods = periods.filter(period => now >=period.dateStart && now <= period.dateFinish);
                  if (activePeriods.length > 0) statusColor = '#21c763';
                }

                return (
                  <div linkTo={`/shifts/view/${attrs.id}`} key={index}>
                    <div>{attrs.title}</div>
                    <div><b>{head_user && head_user.attributes.name}</b><br/>{head_user && head_user.attributes.post_name}</div>
                    <div><FlagCircleIcon style={{color: statusColor}}/></div>
                    <div><b>{users.length}</b></div>
                    <div>{platform && platform.attributes.ru_alias}</div>
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