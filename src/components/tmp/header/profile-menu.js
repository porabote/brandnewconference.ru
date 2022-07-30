import React from "react";
import {useSelector} from "react-redux";
import {NavLink} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';

const ProfileMenu = (props) => {

  const {user} = useSelector(state => state.auth);

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('porabote_user');
    window.location = '/users/logout/'
  }

  return (
    <div className={props.isMenuOpen ? "header-panel__profile__dropdown open" : "header-panel__profile__dropdown"}>

      <div className="header-panel__profile__dropdown__item">
        <PersonIcon style={{color: '#444', marginRight: '12px', fontSize: '18px'}}/>
        <NavLink to={`/users/view/${user.id}`}
                 className="header-panel__profile__dropdown__item__divnk profil"> Профиль</NavLink>
      </div>

      <React.Fragment>
        {props.perms.isCanViewBusinessEvents &&
          <div className="header-panel__profile__dropdown__item">
            <SettingsEthernetIcon style={{color: '#444', marginRight: '12px', fontSize: '18px'}}/>
            <NavLink to="/business-events/feed/"
                     className="header-panel__profile__dropdown__item__divnk profil">Бизнес-события</NavLink>
          </div>
        }
        {props.perms.isCanViewConfigs &&

          <div className="header-panel__profile__dropdown__item">
            <SettingsIcon style={{color: '#444', marginRight: '12px', fontSize: '18px'}}/>
            <a href="/configs/" className="header-panel__profile__dropdown__item__divnk profil"> Конфигурация</a>
          </div>
        }

        {props.perms.isCanViewUsers &&
          <div className="header-panel__profile__dropdown__item">
            <GroupIcon style={{color: '#444', marginRight: '12px', fontSize: '18px'}}/>
            <a href="/porabote/users/feed/"
               className="header-panel__profile__dropdown__item__divnk profil"> Пользователи</a>
          </div>
        }
      </React.Fragment>


      <div className="header-panel__profile__dropdown__separator"></div>
      <div className="header-panel__profile__dropdown__item ">
        <ExitToAppIcon style={{color: '#444', marginRight: '12px', fontSize: '18px'}}/>
        <span onClick={logout} className="header-panel__profile__dropdown__item__divnk exit">Выход</span>
      </div>

    </div>
  )
}

export default ProfileMenu