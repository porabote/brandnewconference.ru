import React, {Component} from 'react'
import { withDictsData } from '@hocs'
import {Field, Option, Select} from 'porabote/form'

class FilterLeftPreloader extends Component {

  render() {

    return (

      <React.Fragment>
        <div className="content__filter__left__title">Фильтр</div>


        <div className="suspense-block"></div>
        <div className="suspense-block"></div>
        <div className="suspense-block"></div>



      </React.Fragment>

    )
  }

}

export default FilterLeftPreloader;