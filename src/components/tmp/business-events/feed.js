import React from 'react'
import Grid from 'porabote/grid'
import { Form, ButtonLazyLoad } from 'porabote/form'
import FilterLeft from './filter-left'
import ContentPanel from './content-panel'
import FilterTop from './filter-top'
import MenuIcon from '@material-ui/icons/Menu'
import Stringer from 'porabote/stringer'
import Api from '@services/api-service'
import moment from 'moment'

class Feed extends React.Component {

    state = {
        page: 1,
        data: [],
        meta: [],
        dicts: [],
        filter: {
            where: {
                week: ''
            },
            seekString: ''
        }
    }

    componentDidMount() {

        Api.get(`/api/dicts/get/`, {
            query: {
                whereIn: {
                    id: [1, 2]
                }
            }
        }).then((data) => {

            const dicts = {};
            data.data.map((dict, index) => {
                dicts[dict['type']] = dict['data'];
            })

            this.setState({
                dicts: dicts
            })
        })

        this.fetchData()
    }

    fetchData = () => {

        Api.get(`/api/business-events/get/`, {
            query: {
               // where: this.state.filter.where,
                include: [
                    'component'
                ],
                page: this.state.page
            }
        }).then((response) => {
            this.setState({
                data: [...this.state.data, ...response.data],
                meta: response.meta,
                page: ++this.state.page
            })
        })
    }


    submitForm = (values) => {
        this.setState({
            data: [],
            page: 1
        }, () => {
            this.fetchData()
        })

    }

    render() {

        const { data, dicts } = this.state
        if (!dicts) return <p>Данные загружаются</p>



        return(

            <Form
                values={this.state.filter}
                submitForm={this.submitForm}
            >
                <div className="content feed">

                    <div className="content__top-filter">
                        <FilterTop/>
                    </div>

                    <div className="content-title">
                        <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
                        События бизнес-логики
                    </div>

                    <div className="content__filter__left">
                        {/*<FilterLeft dicts={dicts} />*/}
                    </div>

                    <div className="content__tools_panel">
                        <ContentPanel fetchData={this.fetchData} dicts={dicts} />
                    </div>

                    <div className="content__body">

                        <Grid grid-template-columns="60px 250px 1fr">

                            <div className="head">
                                <div>ID</div>
                                <div>Компонент</div>
                                <div>Событие</div>
                            </div>

                            {
                                data.map((record, index) => {

                                    const attrs = record.attributes;
                                    const rels = record.relationships;

                                    return(
                                        <div linkTo={`/business-events/view/${attrs.id}`} key={attrs.id}>
                                            <div>{attrs.id}</div>
                                            <div>{rels.component.attributes.description}</div>
                                            <div>{attrs.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Grid>

                        <ButtonLazyLoad meta={this.state.meta} fetch={this.fetchData} page={this.state.page}/>

                    </div>
                </div>
            </Form>


        )
    }
}

export default Feed