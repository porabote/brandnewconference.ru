import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import {
  Field,
  InputBare,
} from 'porabote/form';

class InputSeek extends PureComponent {

  constructor(props) {
    super(props);

     this.state = {
       data: [],
     }
  }
  //
  // setData = (data) => {
  //   alert(88);
  //   //console.log(data);
  // }

  render() {
    return (
      <div className="fast-find__item">
        <SearchIcon style={{color: '#888', fontSize: 22, padding: '4px 8px'}}/>
        <Field>
          <InputBare
            placeholder="Поиск по названию"
            type="text"
            name="seekString"
            className="fast-find__item__input"
            onKeyUp={(e, params) => {
              this.props.onKeyUp(e, params);
              params.formContext.submitForm(params.formContext.values, this.setData);
            }}
          />
        </Field>
        <div className="fast-find__item__thumbler"></div>
        <div className="fast-find__item__drop-panel">
          {this.props.children}
        </div>
      </div>
    );
  }
}

InputSeek.propTypes = {};

export default InputSeek;