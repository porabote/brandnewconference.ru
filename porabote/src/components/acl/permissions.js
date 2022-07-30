import React from "react";
import Api from "@services/api-service";
import { StripedList, StripedListRow, StripedListCell } from "porabote/striped-list";
import { Form, Field, Checkbox } from "porabote/form";

class Permissions extends React.Component {

  state = {
    data: [],
    acosList: [],
    permissions: {},
    aro: {},
    loading: true
  }


  componentDidMount() {
    this.fetchRecord();
  }

  fetchRecord = () => {

    this.setState({
      loading: true
    })

    Api.post(`/api/users/method/getAclLists`, {
      body: {
        user_id: this.props.data.id,
      }
    }).then((data) => {
      this.setState({
        ...data.data,
        loading: false
      })
    })
  }

  setPermission = (aco_id, status) => {

    Api.post(`/api/users/method/setPermission`, {
      body: {
        aco_id,
        status,
        aro_id: this.state.aro.id
      }
    }).then((data) => {
      this.setState({
        ...data.data,
        loading: false
      })
    })

  }

  render() {

    if (this.state.loading) return <div className="empty-data">Данные загружаются</div>

    return(
      <Form values={{access: null}}>
        <StripedList style={{gridTemplateColumns: '250px 1fr'}}>
          {
            this.state.acosList.map((aco, index) => {

              let access = (typeof this.state.permissions[aco.id] !== "undefined") ? true : false;

              return(
                <StripedListRow key={index}>
                  <StripedListCell>
                    {aco.name}
                  </StripedListCell>
                  <StripedListCell>
                    <Field>
                      <Checkbox
                        name="access"
                        initChecked={access}
                        onChange={(e) => {
                          this.setPermission(aco.id, e.target.checked);
                        }}
                      />
                    </Field>
                  </StripedListCell>
                </StripedListRow>
              )
            })
          }
        </StripedList>
      </Form>
    );
  }
}

export default Permissions;