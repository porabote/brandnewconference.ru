import React from 'react'
import { Field, InputBare } from 'porabote/form'
import SearchIcon from '@material-ui/icons/Search';

class FilterTop extends React.Component {

    render() {

        return(
                <div className="fast-find__item">
                    <SearchIcon style={{color: '#888', fontSize: 22, padding: '4px 8px'}}/>
                    <Field>
                        <InputBare
                            placeholder="Поиск по номеру счета"
                            type="text"
                            name="seekString"
                            className="fast-find__item__input"
                            onChange={(e, params) => {
                                console.log(params.formContext)
                                params.formContext.submitForm()
                            }}
                        />
                    </Field>
                    <div className="fast-find__item__thumbler"></div>
                </div>
        )
    }
}

export default FilterTop