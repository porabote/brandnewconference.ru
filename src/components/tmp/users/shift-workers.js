import React from "react";
import {
  Form,
  Field,
  Input,
  InputDate,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";
import Table, {Row, Cell} from "porabote/table";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ShiftWorkers = (props) => {

  const shiftworkers = props.data.relationships.shiftworkers;

  return(
    <div>

      <Form values={{shiftworker_id: ''}}>
        <Field>
          <Select
            name="shiftworker_id"
            label="Добавить сменщика"
            afterSelectCallback={(ev, context) => {
              props.attachShiftWorker(context.values.shiftworker_id, props.data.id);
            }}
          >
            {Object.entries(props.dicts.api_users).map((item, index) => {
              let user = item[1];
              return <Option value={user.id} key={index}>{`${user.name} - ${user.post_name}`}</Option>
            })}
          </Select>
        </Field>

        <Table grid-template-columns="1fr 60px">
          {Object.entries(shiftworkers).map((item, index) => {
            let user = item[1].relationships.user.attributes;
            return(
              <Row key={index}>
                <Cell><b>{user.name}</b><br/>{user.post_name}</Cell>
                <Cell>
                  <RemoveCircleOutlineIcon
                    className="link_with_icon grey"
                    onClick={(e) => {
                      props.detachShiftWorker(user.id, props.data.id);
                    }}
                  />
                </Cell>
              </Row>
            );
          })}
        </Table>

      </Form>

    </div>
  );
}

export default ShiftWorkers;