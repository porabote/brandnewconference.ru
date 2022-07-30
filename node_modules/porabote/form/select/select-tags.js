import React from 'react'
import Datas from 'porabote/datas'

class SelectTags extends React.Component {

    removeItem = (e) => {
        let deleteKey = e.target.getAttribute('item');
        let values = this.props.value.filter((item, index) => index != deleteKey)
        this.props.formContext.setFieldValue(this.props.name, values, 'replace')
    }

    render() {

        let currentValue = Datas.getValueByPath(this.props.name, this.props.formContext.values);

        if (!currentValue) {
          console.log("Значение для поля не найдено");
        }

        return(
            <React.Fragment>
                <div></div>
                <div className={currentValue.length > 0 ? 'select-tags active' : 'select-tags'}>
                    {
                        currentValue.map((val, index) => {

                            let value = (typeof this.props.tagElement == "function")
                              ? this.props.tagElement(val, this.props.dataStorage) : val;

                            return (
                                <div key={index} className='select-tag'>
                                    <span
                                        item={index}
                                        className='select-tag-close'
                                        onClick={this.removeItem}
                                    >
                                        x
                                    </span>
                                    {value}
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    }

}

export default SelectTags