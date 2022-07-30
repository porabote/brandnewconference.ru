import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { logout } from '../auth/store/auth-actions'
import {connect} from 'react-redux'
import ProfileMenu from './profile-menu'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const Profile = (props) => {

    const [isMenuOpen, toggleMenu] = useState(false);

    if(!props.auth.isAuth) {
        return (
            <div className="header__panel__auth">
            </div>
        )
    }

    return (

        <div
            className="header-panel__profile"
            onClick={() => {
                let isOpen = (isMenuOpen) ? false : true;
                toggleMenu(isOpen);
            }}
        >

            <div
                className="header-panel__profile__info"
                href="/users/profile"
            >
                <span>{props.auth.user.name}</span>
                <span className="header-panel__profile__info__alias">{props.auth.user.account_alias}</span>
            </div>

            <div
                className="header-panel__profile__photo"
                style={{backgroundImage: `url(${props.auth.user.avatar})`}}
            >
            </div>

            <ProfileMenu perms={props.perms} auth={props.auth} isMenuOpen={isMenuOpen} />

        </div>

    )
}

const mapDispatchToProps = {
    logout
}

export default connect(null, mapDispatchToProps)(Profile)
//<span className="header-panel__profile__data__fio">{props.auth.user.name}</span>