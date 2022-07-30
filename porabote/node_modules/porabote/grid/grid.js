import React, { Component } from 'react'
import GridRow from './grid-row'
import './grid.less'

class Grid extends Component {

    render() {

        return(
            <div className="grid-wrap">
                <div className="grid-hover">
                    {
                        React.Children.map(this.props.children, (row, index) => {
                            return(
                                <GridRow
                                    grid-template-columns={this.props['grid-template-columns']}
                                    {...row.props}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

export default Grid