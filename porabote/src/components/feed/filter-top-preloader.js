import React from 'react'
import {Field, InputBare} from 'porabote/form'
import SearchIcon from '@material-ui/icons/Search';

const FilterTopPreloader = (props) => {

  return (
    <div className="fast-find__item" style={{gridTemplateColumns: '1fr'}}>
      <div className="suspense-block" style={{marginBottom: 0}}></div>
    </div>
  )
}

export default FilterTopPreloader;