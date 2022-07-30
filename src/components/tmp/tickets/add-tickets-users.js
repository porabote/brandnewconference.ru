import React, {useState, useEffect} from "react";
import Table, {Row, Cell} from "porabote/table";
import {
  Form,
  Field,
  Select,
  Option,
  Button,
  SubmitButton,
} from "porabote/form";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const AddTicketsUsers = (props) => {

  let [users, setUsers] = useState({});

  if (!users) return <p>Загрузка данных</p>;

  const selectUser = (ev, context) => {
    const {user_id} = context.values;
    if (typeof users[user_id] == "undefined") {
      let usersNew = {...users};
      usersNew[user_id] = {...props.dicts.api_users[user_id]};
      setUsers({...usersNew});
    }
  }

  const selectShift = (ev, context) => {
    const {shift_id} = context.values;
    let usersNew = {...users};

    Object.entries(props.dicts.api_users).map((item, index) => {
      let user = item[1];
      if (user.shift_id == shift_id) {
        usersNew[user.id] = {...props.dicts.api_users[user.id]};
      }
    });

    setUsers({...usersNew});
  }

return (
  <Form values={{user_id: ''}}>
    <Field>
      <Select name="user_id" label="Выбрать по пользователю" afterSelectCallback={selectUser}>
        {Object.entries(props.dicts.api_users).map((item, index) => {
          let user = item[1];
          return <Option value={user.id} key={index}>{`${user.name} - ${user.post_name}`}</Option>
        })}
      </Select>
    </Field>

    <Field>
      <Select name="shift_id" label="Выбрать по смене" afterSelectCallback={selectShift}>
        {Object.entries(props.dicts.shifts).map((item, index) => {
          let shift = item[1];
          return <Option onClick={selectUser} value={shift.id} key={index}>{shift.title}</Option>
        })}
      </Select>
    </Field>

    {Object.entries(users).length > 0 &&
      <h3 style={{padding: '30px 0 20px 0'}}>Выбранные пользователи</h3>
    }

    <Table>
      {Object.entries(users).map((item, index) => {
        let user = item[1];
        return(
          <Row key={index}>
            <Cell><b>{user.name}</b><br/>{user.post_name}</Cell>
          </Row>
        );
      })}
    </Table>


    {Object.entries(users).length > 0 &&

        <Button
          text="Сохранить"
          className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
          type="button"
          style={{width: '140px', marginTop: '20px'}}
          onClick={(ev, values) => {
            props.addTicketsSubmit(props.requestId, users, props.itemkey, props.setTickets);
          }
          }
        />
    }

  </Form>
);
}

export default AddTicketsUsers;