import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {fetchData} from "./store/actions";
import Grid from 'porabote/grid'
import {Form, ButtonLazyLoad} from 'porabote/form'
import FilterLeft from './filter-left'
import ContentPanel from './content-panel'
import FilterTop from './filter-top'
import MenuIcon from '@material-ui/icons/Menu'
import Stringer from 'porabote/stringer'
import Api from '@services/api-service'
import moment from 'moment'
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.paymentsSets);

    const submitForm = (values) => {
        props.updateFilters(values);
        props.fetchData();
    }

    if (!props.isDictsLoaded) {
        return <FeedPreloader title="Планы оплат"/>;
    }

  return (

    <Form
      values={filter}
      submitForm={submitForm}
    >
      <div className="content feed">

        <div className="content__top-filter">
          <FilterTop/>
        </div>

        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          Планы оплат
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          <ContentPanel fetchData={fetchData}/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px 100px 140px 120px 120px 180px 170px 120px 180px">

            <div className="head">
              <div>ID</div>
              <div>Неделя</div>
              <div>Дата платежа</div>
              <div>Курс EURO</div>
              <div>Курс USD</div>
              <div>Сумма EUR</div>
              <div>Сумма RUR</div>
              <div>Объекты</div>
              <div>Создано</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes

                let summa = 0;
                record.relationships.payments.map(payment => {
                  summa += parseFloat(payment.attributes.summa) / parseFloat(attrs.rate_euro)
                })

                let summaRur = 0;
                record.relationships.payments.map(payment => {
                  summaRur += parseInt(payment.attributes.summa)
                })

                let objects = '';
                let objectsList = {};
                record.relationships.payments.map(payment => {
                  if (
                    typeof payment.relationships.object != "undefined"
                    && typeof objectsList[payment.relationships.object.attributes.name] == "undefined"
                  ) {
                    objects += `${payment.relationships.object.attributes.name}; `
                    objectsList[payment.relationships.object.attributes.name] = payment.relationships.object.attributes.name;
                  }
                })

                return (
                  <div linkTo={`/payments-sets/view/${attrs.id}`} key={attrs.id}>
                    <div>{attrs.id}</div>
                    <div>{attrs.week}</div>
                    <div>{moment(attrs.date_payment).format("DD/MM/YYYY")}</div>
                    <div>{attrs.rate_euro}</div>
                    <div>{attrs.rate_usd}</div>
                    <div>
                      {Stringer.toSummaFormat(summa)}
                    </div>
                    <div>
                      {Stringer.toSummaFormat(summaRur)}
                    </div>
                    <div>{objects}</div>
                    <div>{moment(attrs.date_created).format("DD/MM/YYYY")}</div>
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

export default Feed