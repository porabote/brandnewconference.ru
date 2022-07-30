import React, { Component } from 'react'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

class FilterLeft extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weeksList: DateTime.getWeeksList(),
            dicts: []
        }
    }

    render() {

        return (

            <React.Fragment>
                <div className="content__filter__left__title">Фильтр</div>
                <Field>
                    <Select
                        name="where.week"
                        label="Неделя:"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {this.state.weeksList.map((alias, id) => {
                            return <Option key={id} value={id}>{alias}</Option>
                        })}
                    </Select>
                </Field>

            </React.Fragment>

        )
    }

}

export default FilterLeft