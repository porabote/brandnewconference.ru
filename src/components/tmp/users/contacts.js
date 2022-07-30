import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Form, Field, InputBare} from 'porabote/form';
import FilterLeftContacts from "./filter-left-contacts";
import Table, {Row, Cell} from "porabote/table";
import {StripedList, StripedListRow, StripedListCell} from "porabote/striped-list";
import SearchIcon from '@material-ui/icons/Search';
import Api from "@services";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from "@material-ui/icons/Menu";
import FeedPreloader from "../feed/feed-preloader";

const Contacts = (props) => {

  const { relationships } = useSelector(state => state.users);

  const {title, data, meta} = useSelector(state => state.users);

  const [searchString, setSearchString] = useState('');
  const [filter, setFilter] = useState({
    seekString: '',
    account_id: '',
    department_id: '',
    shift_id: '',
  });
  
  const [users, setUsers] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Api.get(`/api/api-users/get/`, {
      query: {
        include: relationships,
        whereIn: {
          status: ['new', 'invited', 'external', 'active'],
        },
        orderBy: {name: 'asc'}
      }
    }).then((resp) => {
      setUsers(resp.data);
    });
  }

  const setLeftFilter = (values) => {
    setFilter({...values});
  }

  const validateUser = (user, department) => {

   if (filter.shift_id.length > 0 && user.shift_id != filter.shift_id) {
     return false;
   } else if (filter.department_id.length > 0 && user.department_id != filter.department_id) {
     return false;
   } else if (typeof department == "undefined" || filter.account_id.length > 0 && filter.account_id != department.attributes.account_id) {
     return false;
   } else if (searchString.length > 0 && !user.name.toLowerCase().includes(searchString)) {
     if (user.phone && user.phone.toString().toLowerCase().includes(searchString)) {
       return true;
     }
     return false;
   }
    return true;
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title="Контакты сотрудников"/>;
  }

  return (
    <Form values={{...filter}}>
      <div className="content feed">


        <div className="content__top-filter" style={{padding: '20px 0'}}>
          <div className="input_share__container">
            <PersonOutlineIcon style={{fontSize: '30px'}} className="input_share__icon"/>
            <Field>
              <InputBare
                placeholder="Поиск по имени фамилии или телефону"
                type="text"
                name="seekString"
                className="input_share_input"
                onKeyUp={(e, params) => {
                  setSearchString(e.target.value.toLowerCase());
                }}
              />
            </Field>
            <div className="fast-find__item__thumbler"></div>
          </div>
        </div>


        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          Контакты сотрудников
        </div>

        <div className="content__filter__left">
          <FilterLeftContacts setLeftFilter={setLeftFilter} />
        </div>


        <div className="content__body">


          <Table grid-template-columns="70px 230px 250px 250px 150px 250px 250px">

            <Row className="head">
              <Cell></Cell>
              <Cell>ФИО/Должность</Cell>
              <Cell>Отдел</Cell>
              <Cell>Email</Cell>
              <Cell>Телефон</Cell>
              <Cell>Сменщики</Cell>
              <Cell>Вахта/Площадка</Cell>
            </Row>

            {Object.entries(users)
              .filter(user => {
                return validateUser(user[1].attributes, user[1].relationships.department);
              })
              .map((item, index) => {

              let user = item[1].attributes;

              const { avatar, department, shift, shiftworkers } = item[1].relationships;

              let avatarUri =  (avatar) ? avatar.attributes.uri : '';
              let Avatar = <div
                className="header-panel__profile__photo"
                style={{backgroundImage: `url(${avatarUri})`}}
              >
              </div>;

                let platformTitle = (shift && shift.attributes.platform) ? `(${shift.attributes.platform.ru_alias})` : '';
              let shiftTitle = shift ? `${shift.attributes.title} (${platformTitle})` : '5/2';

              return (
                <Row key={index}>
                  <Cell>{Avatar}</Cell>
                  <Cell><b>{user.name}</b><br/>{user.post_name}</Cell>
                  <Cell>{department && department.attributes.name}</Cell>
                  <Cell style={{textOverflow: 'clip'}}><a href={`mailto:${user.email}`}>{user.email}</a></Cell>
                  <Cell>{user.phone}</Cell>
                  <Cell>{shiftworkers.map((worker, index) => {
                    if (worker) {
                      let workerName = (typeof worker.relationships.user != "undefined") ? `${worker.relationships.user.attributes.name}; ` : '';
                      return workerName;
                  }
                  })}</Cell>
                  <Cell>{shiftTitle}</Cell>
                </Row>
              );
            })}
          </Table>
        </div>

      </div>
    </Form>
  );
}

export default Contacts;