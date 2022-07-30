import React, { Component } from 'react'
import { FormProvider } from './form-context'
import Api from '@services/api-service'

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: props.values || {},
            errors: []
        }
    }

    /*
    * Convert string path like 'one.1.two' to Object like {"one": {"1": {"two": 'testValue'}}}
    *
    *
    * */
    buildPathBranch = (path, value) => {
        let splits = path.split('.');
        splits.reverse()

        let target = {};

        splits.map((key, index) => {
            if (index == 0) {
                target[key] = value
            } else {
                let arr = isNaN(parseInt(key)) ? {} : []
                arr[key] = target
                target = arr
            }
        })

        return target
    }

    _setFieldValue = (name, value, mode = 'merge') => {

        const valueBranch = this.buildPathBranch(name, value)

        switch (mode) {
            case 'merge': //if value is string or object
                var values = this.mergeValues(this.state.values, valueBranch);
                break;
            case 'delete': // unset value ( with key )
                var values = this._deleteValue(this.state.values, name);
                break;
            case 'replace': // if value is array - target array will be replaced to source array
                var values = this.replaceValue(this.state.values, valueBranch);
                break;
            case 'push': // if value is array - source array will be added to target array
                var values = this._pushValue(this.state.values, name, value);
                break;
            case 'spliceByKey': // if value is array - source array will be removed from target array
                var values = this._spliceByKey(this.state.values, name, value)
                break;
            case 'patch': // Set new path in source
                var values = this._setPatch(this.state.values, name, value)
                break;
        }

        this.setState({
            values
        })
    }

    isObject = (item) => {
        return (item && typeof  item === 'object' && !Array.isArray(item))
    }

    isArray = (item) => {
        return (item && Array.isArray(item))
    }

    _spliceByKey = (target, name, index) => {
        let splits = name.split('.');

        let cursor = target;
        for (const key in splits) {
            cursor = cursor[splits[key]]
        }
        cursor.splice(index, 1)

        return target
    }

    _deleteValue = (target, name) => {
        let splits = name.split('.');

        let cursor = target;
        for (const key in splits) {
            if (!this.isObject(cursor[splits[key]])) {
                delete cursor[splits[key]];
                break;
            }

            cursor = cursor[splits[key]]
        }

        return target
    }

    _pushValue = (target, name, value) => {
        let splits = name.split('.');

        let cursor = target;
        for (const key in splits) {
            cursor = cursor[splits[key]]
        }
        cursor.push(value)
        return target
    }

    _setPatch = (suorce, name, value) => {
        let splits = name.split('.');

        let cursor = suorce;
        splits.map((item, index) => {

            if (splits.length == index + 1) {
                cursor[item] = value;
            } else {
                cursor[item] = (typeof cursor[item] == "undefined") ? {} : cursor[item]
                cursor = cursor[item]
            }
        })

        return suorce
    }

    replaceValue = (target, source) => {

        for (const key in source) {
            if (this.isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}})
                this.replaceValue(target[key], source[key])
            } else if (this.isArray(source[key])) {
                target[key] = source[key]
            } else {
                Object.assign(target, {[key]: source[key]})
            }
        }

        return target
    }

    mergeValues = (target, source) => {

        for (const key in source) {
            if (this.isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}})
                this.mergeValues(target[key], source[key])
            } else if (this.isArray(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: []})
                this.mergeValues(target[key], source[key])
            } else {
                Object.assign(target, {[key]: source[key]})
            }
        }

        return target
    }

    _submitForm = (formContext) => {

        let values = { ...this.state.values }

        if(typeof this.props.submitFormBefore === "function") {
            let beforeResult = this.props.submitFormBefore(values, formContext);
            if (!beforeResult) {
                return beforeResult;
            }
        }

        if(typeof this.props.submitForm === "function") {
            return this.props.submitForm(values, {setFieldValue: this._setFieldValue});
        }
      
        if(typeof this.props.beforeSubmit === "function") {
            values =  this.props.beforeSubmit(formContext);
        }

        Api.post(this.props.action, {
            body: values
        })
        .then( response => {

            if(typeof this.props.submitFormAfter == "function") {

                if( response.errors ) {
                    this.setState({
                        errors: response.errors
                    })
                }

                this.props.submitFormAfter(response, formContext);

            }

        })


    }

    render() {

        return(
            <FormProvider value={{
                values: this.state.values,
                errors: this.state.errors,
                setFieldValue: this._setFieldValue.bind(this),
                submitForm: this._submitForm.bind(this)
            }}>
                <form>
                    {this.props.children}
                </form>
            </FormProvider>
        )
    }
}

export default Form