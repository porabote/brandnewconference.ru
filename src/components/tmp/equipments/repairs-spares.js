import React from "react";
import { connect } from "react-redux";
import {withDictsData} from "@hocs";
import Api from "@services/api-service";
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";
import {
  Form,
  Field,
  Input,
  InputBare,
  InputSeek,
  Button,
  SubmitButton,
  Select,
  Option,
} from 'porabote/form';
import RepairsSparesAttach from "./repairs-spares-attach";

class RepairsSpares extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      seekOptions: [],
      spares: [],
    }
  }

  submitForm = (values) => {

    if (values.seekString.length < 1) {
      this.setState({
        seekOptions: [],
      });
      return;
    }

    if (values.store_id.length == 0) {
      alert("Пожалуйста, выберите склад.");
    } else {
      Api.get(
        "/api/spares/get/",
        {
          query: {
            include: ["store"],
            where: {
              store_id: values.store_id,
              status_id: 67,
              name: {
                value: values.seekString,
                operand: 'like',
              }
            },
          },
        }
      )
        .then((res) => {
          this.setState({
            seekOptions: res.data,
          })
        });
    }
  }

  componentDidMount() {
    this.getSpares();
  }

  backToStore = (node) => {
    Api.get(
      `/api/equipments-repairs/method/backToStore/${node.id}`
    ).then((res) => {
      this.getSpares();
    })
  }

  getSpares = () => {

    Api.get(
      `/api/equipments-repairs/get/${this.props.repair.id}`,
      {
        query: {
          include: [
            "spares",
            "spares.spare",
            "spares.spare.store",
          ],
        },
      }
    )
      .then((res) => {
        this.setState({
          spares: res.data.relationships.spares,
        })
      });
  }

  render() {

    return (
      <Form
        values={{
          store_id: '',
          name: '',
          seekString: ""
        }}
        submitForm={(values) => {
          this.submitForm(values);
        }}
        // submitFormAfter={(resp) => {
        //   console.log(resp)
        // }}
      >

      <div style={{display: 'grid', gridTemplateColumns: '200px 40px 1fr'}}>

          <div>

            <h3 style={{padding: '10px 0 10px 0'}}>Фильтр</h3>

            <Field>
              <Select
                name="store_id"
                label="Склад"
                empty={false}
                afterSelectCallback={(event, formContext) => {
                  this.setState({
                    type: formContext.values.type
                  })
                }}
              >
                {Object.keys(this.props.dicts.objects).map((key, index) => {
                  let data = this.props.dicts.objects[key];
                  if (data.kind == "store") {
                    return <Option key={index} value={data.id}>{data.name}</Option>;
                  }
                })}
              </Select>
            </Field>

          </div>

        <div></div>

          <div>
            <h3 style={{padding: '10px 0 10px 0'}}>Выбор запчасти</h3>
            <InputSeek
              submitForm={this.submitForm}
              onKeyUp={(e, params, setData) => {
                let value = e.target.value;
                params.formContext.setFieldValue('where.name.value', value);
                //params.formContext.submitForm(setData);
              }}
            >
              {this.state.seekOptions.map((item, index) => {
                const data = item.attributes;
                return(
                  <div 
                    onClick={(e) => {

                      let count = '';
                      {Object.keys(this.state.spares).map((key, index) => {
                        if (this.state.spares[key].attributes.spare_id == item['id']) {
                          count = this.state.spares[key].attributes.count;
                        }
                      })}

                      this.setState({
                        seekOptions: []
                      });

                      this.props.pushItemToModal(
                        <RepairsSparesAttach
                          count={count}
                          getRecord={this.props.getRecord}
                          repair={this.props.repair}
                          spare={item}
                          getSpares={this.getSpares}
                        />,
                        `Зачасти к ремонту/то N ${data.id} - ${data.name}`,
                      );
                    }} 
                    key={index} 
                    className="fast-find__item__drop-panel__item"
                  >
                    <p>{data.name}</p>
                  <p style={{color: '#999', fontSize: '14px'}}>Aрт. {data.vendor_code} - <b> {data.quantity} {data.unit}</b></p>
                  </div>
                );
              })}
            </InputSeek>




            <h3 style={{padding: '20px 0 10px 0'}}>Применённые запчасти</h3>
            <StripedList key={1} style={{gridTemplateColumns: '1fr 140px 200px 100px 40px'}}>
              <StripedListRow key={99}>
                <StripedListCell><b>Название</b></StripedListCell>
                <StripedListCell><b>Количество</b></StripedListCell>
                <StripedListCell><b>Склад</b></StripedListCell>
                <StripedListCell><b>Остаток на складе</b></StripedListCell>
                <StripedListCell><b></b></StripedListCell>
              </StripedListRow>
              {this.state.spares.map((node, index) => {
                let spare = node.relationships.spare.attributes;
                return(
                  <StripedListRow key={index}>
                    <StripedListCell>
                      <a target="_blank" href={`/spares/view/${spare.id}`}>{spare.name}</a>
                    </StripedListCell>
                    <StripedListCell>{node.attributes.count}</StripedListCell>
                    <StripedListCell>{spare.store.name}</StripedListCell>
                    <StripedListCell>{spare.quantity}</StripedListCell>
                    <StripedListCell>
                      <div
                        className="link_with_icon"
                        onClick={() => {
                          this.props.openConfirm(
                            `Ворнуть на склад зачастей к ремонту/то N ${this.props.repair.id} - ${this.props.repair.name}`,
                            this.backToStore,
                            node,
                          );
                        }}
                      >
                        <BackspaceIcon style={{fontSize: '18px'}}/>
                      </div>
                    </StripedListCell>
                  </StripedListRow>
                )
              })}

            </StripedList>



          </div>

          <div>

          </div>

      </div>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openConfirm: (msg, approveCallback, callbackData) => dispatch({
      type: "OPEN_CONFIRM",
      payload: {msg, approveCallback, callbackData},
    }),
    pushItemToModal: (content, title) => dispatch({type: 'PUSH_MODAL_ITEM', payload: {title, content}}),
  }
}

export default connect(null, mapDispatchToProps)(withDictsData(RepairsSpares, {storeAlias: "equipments"}));