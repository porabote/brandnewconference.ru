import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GridCell from './grid-cell'
import Moment from 'moment';

class GridRow extends Component {

    render() {

        if (typeof this.props.linkTo !== "undefined") {
            return(
                <Link
                    to={this.props.linkTo}
                    className={typeof this.props.className == "undefined" ? "grid" : "grid head" }
                    style={{gridTemplateColumns: this.props['grid-template-columns']}}
                >
                    {
                        React.Children.map(this.props.children, (row, index) => {
                            return(
                                <GridCell
                                    {...row.props}
                                />
                            )
                        })
                    }

                </Link>
            )
        } else {
            return(
                <div
                    className={typeof this.props.className == "undefined" ? "grid" : "grid head" }
                    style={{gridTemplateColumns: this.props['grid-template-columns']}}
                >
                    {
                        React.Children.map(this.props.children, (row, index) => {
                            return(
                                <GridCell
                                    {...row.props}
                                />
                            )
                        })
                    }
                </div>
            )
        }
    }

}

export default GridRow