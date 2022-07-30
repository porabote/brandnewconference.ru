import React, { Component } from 'react'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

class FilterLeft extends Component {

    constructor(props) {
        super(props);
        this.weeksList = DateTime.getWeeksList();

        this.state = {
            dicts: []
        }
    }

    componentDidMount() {

        const dicts = {}

        this.props.dicts.map(data => {
            dicts[data.attributes.assoc_table] = data.list
        })

        this.setState({
            dicts: dicts
        })
    }

    render() {

        if (this.state.dicts.length == 0) return <p>Данные загружаются...</p>;

        const { departments, report_types } = this.state.dicts

        return (

            <React.Fragment>
                <Field>
                    <Select
                        name="left.type_id"
                        label="Тип отчета:"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {Object.keys(report_types).map((id) => {
                            return <Option key={id} value={id}>{report_types[id].name}</Option>
                        })}
                    </Select>
                </Field>

                <Field>
                    <Select
                        name="left.object_id"
                        label="Обьект"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {Object.keys(departments).map((id) => {
                            if (departments[id].custom_type == 5) {
                                return <Option key={id} value={id}>{departments[id].name}</Option>
                            }
                        })}
                    </Select>
                </Field>
            </React.Fragment>

        )
    }

}

export default FilterLeft