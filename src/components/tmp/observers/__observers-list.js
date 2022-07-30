import React, {Component} from 'react'
import {connect} from 'react-redux'
import { fetchRecordsThunk } from './observers-actions'
import { FeedList, FeedListBody, FeedListBodyRow } from '../app/feed-list'
import ListWithData from '../hoc/list-with-data'
import { Checkbox } from '../app/form'
import moment from 'moment'

class ObserversList extends Component {

    constructor(props) {

        super(props)

        this.state = {
            schema: [
                {
                    name: 'Тип отчета',
                    width: '100px',
                    field: 'type_id'
                },
                {
                    name: 'Комментарий',
                    width: '180px',
                    field: 'comment'
                },
                {
                    name: 'Дата (на период)',
                    width: '120px',
                    field: 'date_period',
                    element: (value) => {
                        if(value) return (<span>{moment(value).format("DD MMM YYYY")}</span>);
                    }
                },
                {
                    name: 'Объект',
                    width: '140px',
                    field: 'object_id'
                },
                {
                    name: 'Дата добавления',
                    width: '140px',
                    field: 'date_created'
                }
            ],
            cellWidths: '',
            ckeckbar: <Checkbox/>
        }
    }

    getCellsWidths()
    {
        let gridTemplateColumns = '50px '

        this.state.schema.map((data) => {
            return gridTemplateColumns += data.width + ' '
        })

        return gridTemplateColumns
    }

    render() {

        let cellWidths = this.getCellsWidths()

        return(
            <div className="content__body">

                <FeedList {...this.state} cellWidths={cellWidths}>
                    <FeedListBody {...this.props}>
                        {this.props.storage.map((data) => {
                            return <FeedListBodyRow
                                ckeckbar={this.state.ckeckbar}
                                schema={this.state.schema}
                                key={data.id}
                                data={data}
                                cellWidths={cellWidths}
                                linkTo={`/observers/view/${data.id}`}
                            />
                        })}
                    </FeedListBody>
                </FeedList>

            </div>
        )

    }

}

const mapStateToProps = store => ({...store.observers})

const mapDispatchToProps = (dispatch) => {
    return {
        action: fetchRecordsThunk
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWithData(ObserversList, 'observers'))