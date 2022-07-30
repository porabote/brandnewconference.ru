import React from "react";
import {useSelector} from "react-redux";
import {fetchData} from "./store/reports-actions";
import Grid from 'porabote/grid'
import { Form, ButtonLazyLoad } from 'porabote/form'
import FilterLeft from './filter-left'
import ContentPanel from './content-panel'
import FilterTop from './filter-top'
import MenuIcon from '@material-ui/icons/Menu'
import Stringer from 'porabote/stringer'
import Api from '@services/api-service'
import moment from 'moment'
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {


    const {title, filter, data, meta} = useSelector(state => state.reports);

    const submitForm = (values) => {
        props.updateFilters(values);
        props.fetchData();
    }

    if (!props.isDictsLoaded) {
        return <FeedPreloader title="Отчёты"/>;
    }

        return(

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
                        Отчёты
                    </div>

                    <div className="content__filter__left">
                        <FilterLeft/>
                    </div>

                    <div className="content__tools_panel">
                        <ContentPanel fetchData={fetchData}/>
                    </div>

                    <div className="content__body">

                        <Grid grid-template-columns="60px 140px 170px 140px 180px 180px 180px">

                            <div className="head">
                                <div>ID</div>
                                <div>Тип отчета</div>
                                <div>На дату</div>
                                <div>Объект</div>
                                <div>Комментарий</div>
                                <div>Добавил</div>
                                <div>Дата добавления</div>
                            </div>

                            {
                                data.map((record, index) => {

                                    const attrs = record.attributes
                                    let rels = record.relationships;

                                    return(
                                        <div linkTo={`/reports/view/${attrs.id}`} key={attrs.id}>
                                            <div>{attrs.id}</div>
                                            <div>{record.relationships.types.attributes.name}</div>
                                            <div>{moment(attrs.date_period).format("DD/MM/YYYY")}</div>
                                            <div>{typeof rels.object !== "undefined" && rels.object.attributes.name}</div>
                                            <div>{attrs.comment}</div>
                                            <div>{record.relationships.user.attributes.name}</div>
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

export default Feed