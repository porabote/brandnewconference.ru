import React, { Component } from 'react'
import { withDictsData } from '@hocs'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

class FilterLeft extends Component {

    render() {

        //const { departments, report_types } = this.props.data

        return (

          <React.Fragment>
              <div className="content__filter__left__title">Фильтр</div>
          </React.Fragment>

        )
    }

}

export default FilterLeft;