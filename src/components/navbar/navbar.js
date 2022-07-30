import React from 'react';
import {NavLink} from 'react-router-dom';
import './navbar.less';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class Navbar extends React.Component {

    setChildren = (items) => {

        if (typeof items === "undefined") return '';

        return(
            <ul className="navbar-vertical">
                {
                    Object.keys(items).map((id) => {
                        if (!items[id]['target']) {
                            return (
                                <li key={id} className="navbar-vertical__item">
                                    <a href={items[id]['link']} className="navbar-vertical__item__link ">
                                        {items[id]['name']}
                                    </a>
                                </li>
                            )
                        } else {
                            return (
                                <li key={id} className="navbar-vertical__item">
                                    <NavLink key={items[id]['id']} to={items[id]['link']} className="navbar-vertical__item__link ">
                                        {items[id]['name']}
                                    </NavLink>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }

    render() {

        if (!this.props.data) return;

        return(
            <div className="navbar__wrap">

                <ul className="navbar-horizontal">
                    {Object.keys(this.props.data).map((id) => {
                        let item = this.props.data[id]

                        if (!item['target']) {
                            return(
                                <li key={item.id} className="navbar-horizontal__item">
                                    <a
                                        key={item.id}
                                        className="navbar-horizontal__item navbar-horizontal__item__link"
                                        href={item.link}
                                    >
                                        {item.name}
                                        {item.children &&
                                            <KeyboardArrowDownIcon style={{fontSize: '16px'}}/>
                                        }
                                    </a>
                                    {this.setChildren(item.children)}
                                </li>
                            )
                        } else {
                            return(
                                <li key={item.id} className="navbar-horizontal__item">
                                    <NavLink
                                        key={item.id}
                                        className="navbar-horizontal__item navbar-horizontal__item__link"
                                        to={item.link}
                                    >
                                        {item.name}
                                        {item.children &&
                                          <KeyboardArrowDownIcon style={{fontSize: '16px'}}/>
                                        }
                                    </NavLink>
                                    {this.setChildren(item.children)}
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }
}

export default Navbar