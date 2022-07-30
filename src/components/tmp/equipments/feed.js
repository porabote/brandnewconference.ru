import React from "react";
import { useSelector } from "react-redux";
import { Form, ButtonLazyLoad, Button } from "porabote/form";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import CarRentalIcon from '@mui/icons-material/CarRental';
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {

  const { title, filter, data, meta } = useSelector(state => state.equipments);

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

          <Grid grid-template-columns="60px 190px 120px 150px 150px 150px 220px 150px">
            <div className="head">
              <div>ID</div>
              <div>Статус</div>
              <div>Организация</div>
              <div>Площадка</div>
              <div>Объект</div>
              {/*<div>SAP №</div>*/}
              <div>Категория</div>
              <div>Наименование оборудования</div>
              {/*<div>Обозначение (тип, марка)</div>*/}
              {/*<div>Завод-изготовитель</div>*/}
              {/*<div>Зав.№ (VIN)</div>*/}
              <div>Инв. №</div>
              {/*<div>Дата изготовления</div>*/}
              {/*<div>Дата ввода в эксплуатацию</div>*/}
            </div>

            {
              data.map((record, index) => {
                const attrs = record.attributes
                let {
                  organizations_own,
                  platform,
                  object,
                  hole,
                  comments,
                  files,
                  history,
                  user,
                  type,
                  status
                } = record.relationships;

                let statusIcon = null;
                if (status) {
                  switch (status.id) {
                    case 60:
                      statusIcon =
                        <PlayCircleFilledWhiteOutlinedIcon style={{color: '#58A65C', paddingRight: '10px'}}/>;
                      break;
                    case 59:
                      statusIcon = <StopCircleOutlinedIcon style={{color: '#D85140', paddingRight: '10px'}}/>;
                      break;
                    case 61:
                      statusIcon = <PauseCircleOutlineOutlinedIcon
                        style={{color: '#F1C042', paddingRight: '10px'}}/>;
                      break;
                    case 70:
                      statusIcon = <CarRentalIcon
                        style={{color: '#58A65C', paddingRight: '10px'}}/>;
                      break;
                  }
                }

                return (
                  <div linkTo={`/equipments/view/${attrs.id}`} key={attrs.id}>
                    <div>{attrs.id}</div>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                      >
                        {statusIcon}
                        <span>
                        {status && status.attributes.name}
                          </span>
                      </div>
                    </div>
                    <div>{organizations_own && organizations_own.attributes.name}</div>
                    <div>{platform && platform.attributes.ru_alias}</div>
                    <div>
                      {object && object.attributes.name}<br/>
                      <span style={{fontSize: '10px'}}>{hole && hole.attributes.name}</span>
                    </div>
                    {/*<div>{attrs.sap_number}</div>*/}
                    <div>{type && type.attributes.name}</div>
                    <div>{attrs.name}</div>
                    {/*<div>{attrs.brand_name}</div>*/}
                    {/*<div>{attrs.factory_name}</div>*/}
                    {/*<div>{attrs.vin_code}</div>*/}
                    <div>{attrs.inventory_number}</div>
                    {/*<div>{attrs.release_date && moment(attrs.release_date).format("MM/YYYY")}</div>*/}
                    {/*<div>{attrs.operation_start && moment(attrs.operation_start).format("MM/YYYY")}</div>*/}
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