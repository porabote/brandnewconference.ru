import React from 'react'
import { Field, InputBare } from 'porabote/form'
import SearchIcon from '@material-ui/icons/Search';

class FilterTop extends React.Component {

    render() {


        // let inc = (() => {
        //     let counter = 0;
        //
        //     return () => {
        //         counter++;
        //         console.log(counter);
        //     }
        // })()
        // inc();
        // inc();

        // const ex = function(value, sum) {
        //     console.log(arguments)
        //     // console.log(`${value}--${sum}`)
        //     // console.log(sum + value)
        // }
        // let fx = ex.bind(null, 10)
        //
        // ex(12, 7);
        // fx(7,12)


        // var a = 5;
        //
        // function test() {
        //     if(a) {
        //         console.log(a)
        //        // var a = 10;
        //     }
        // }
        // test();
        // let words = ['banana', 'grape', 'banana', 'grape', 'banana', 'orange', 'banana'];
        //
        // let sorts = [];
        // words.map((item) => {
        //     sorts[item] = ++sorts[item] || 1
        // })
        // console.log(sorts)

        return(
                <div className="fast-find__item">
                    <SearchIcon style={{color: '#888', fontSize: 22, padding: '4px 8px'}}/>
                    <Field>
                        <InputBare
                            placeholder="Поиск по номеру счета"
                            type="text"
                            name="seekString"
                            className="fast-find__item__input"
                            onKeyUp={(e, params) => {
                                let value = e.target.value;
                                params.formContext.setFieldValue('where.id.value', value);
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