import React from "react";
import Api from "@services/api-service";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";
import AddIcon from '@mui/icons-material/Add';
import EngineHoursAdd from "./engine-hours-add";
import { connect } from "react-redux";
import DateTime from "porabote/date-time";
import {
  Form,
  Field,
  Select,
  Option,
} from 'porabote/form';
import moment from "moment";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

class EngineHours extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date_at: '1900',
      date_to: '4999',
      months: DateTime.monthsList,
    };
  }

  deleteHours = data => {

    Api.post(`/api/equipments/method/markToDeleteHours/`, {
      body: data
    })
      .then((data) => {
        this.props.getRecord();
      });
  }

  render() {

    let hours = this.props.record.attributes.engine_hours;
    hours = (hours) ? JSON.parse(hours) : [];

    let years = {};
    let dataSorted = {};
    let amount = 0;
    hours.map((item) => {

      let date = item.date_at.split("-");
      if (date[0] >= this.state.date_at && date[0] <= this.state.date_to) {
        years[date[0]] = date[0];
      }

      let alias = `${date[0]}-${date[1]}`;
      if (typeof dataSorted[alias] == "undefined") {
        dataSorted[alias] = parseInt(item['count']);
      } else {
        dataSorted[alias] += parseInt(item['count']);
      }

      amount += parseInt(item['count']);
    });

    return(
      <div style={{display: 'grid', gridTemplateColumns: '200px 40px 1fr'}}>

        <div>

          <h3 style={{padding: '10px 0 10px 0'}}>Фильтр</h3>

          <Form
            values={{
              date_at: '',
              date_to: '',
            }}
          >
            <Field>
              <Select
                name="date_at"
                label="Период с"
                afterSelectCallback={(event, formContext) => {
                  this.setState({
                    date_at: (formContext.values.date_at.length > 0) ? formContext.values.date_at : '1900'
                  })
                }}
              >
                {Object.keys(years).map((key, index) => {
                  return <Option key={index} value={years[key]}>{years[key]}</Option>;
                })}
              </Select>
            </Field>

            <Field>
              <Select
                name="date_to"
                label="Период по"
                afterSelectCallback={(event, formContext) => {
                  this.setState({
                    date_to: (formContext.values.date_to.length > 0) ? formContext.values.date_to : '4999'
                  })
                }}
              >
                {Object.keys(years).map((key, index) => {
                  return <Option key={index} value={years[key]}>{years[key]}</Option>;
                })}
              </Select>
            </Field>
          </Form>

        </div>

        <div></div>

        <div>
        <h3 style={{padding: '10px 0 10px 0'}}>Сводные данные</h3>


        <StripedList key={0} style={{gridTemplateColumns: '100px repeat(12, 75px)'}}>

          <StripedListRow key={0}>
            <StripedListCell></StripedListCell>
            {
              this.state.months.map((month, index) => {
                return <StripedListCell key={index}><b>{month[1]}</b></StripedListCell>;
              })
            }
          </StripedListRow>

          {
            Object.keys(years).map((key, index) => {
              return(
                <StripedListRow key={index}>
                  <StripedListCell>{years[key]}</StripedListCell>
                  {
                    this.state.months.map((month, index) => {

                      let alias = `${years[key]}-${month[3]}`;
                      let value = dataSorted[alias] || '';
                      return(
                        <StripedListCell key={index}>
                          {value}
                        </StripedListCell>
                      );
                    })
                  }
                </StripedListRow>
              );
            })
          }


          <StripedListRow>
            <StripedListCell>Итого: <b>{amount}</b></StripedListCell>
            {
              this.state.months.map((month, index) => {
                return <StripedListCell key={index}></StripedListCell>;
              })
            }
          </StripedListRow>

        </StripedList>

        <div style={{paddingBottom: '40px'}}></div>




        <h3 style={{padding: '20px 0 10px 0'}}>Наработка оборудования</h3>
        <StripedList key={1} style={{gridTemplateColumns: '100px 200px 200px 140px 40px'}}>
          <StripedListRow key={99}>
            <StripedListCell><b>Наработка</b></StripedListCell>
            <StripedListCell><b>Период</b></StripedListCell>
            <StripedListCell><b>Добавил</b></StripedListCell>
            <StripedListCell><b>Дата</b></StripedListCell>
            <StripedListCell>

              <div
                className="link_with_icon"
                onClick={() => {
                  this.props.pushItemToModal(
                    <EngineHoursAdd
                      getRecord={this.props.getRecord}
                      record={this.props.record}
                    />,
                    'Добавить наработку',
                  );
                }}
              >
                <AddIcon/>
              </div>

            </StripedListCell>
          </StripedListRow>
          {hours.map((item, index) => {
            return (
              <StripedListRow key={index}>
                <StripedListCell>{item.count}</StripedListCell>
                <StripedListCell>{moment(item.date_at).format('DD-MM-Y')} - {moment(item.date_to).format('DD-MM-Y')}</StripedListCell>
                <StripedListCell>{item.user_name}</StripedListCell>
                <StripedListCell>{moment(item.created_at).format('DD-MM-Y')}</StripedListCell>
                <StripedListCell>
                  <DeleteOutlineIcon
                    style={{color: 'rgba(243,111,161,0.96)', cursor: 'pointer', fontSize: '24px'}}
                    onClick={() => {
                      this.props.openConfirm(
                        `Удалить наработку - <br> ${item.count}</b>`,
                        this.deleteHours,
                        {record_id: this.props.record.id, key: index},
                      )
                    }}
                  />
                </StripedListCell>
              </StripedListRow>
            );
          })}
        </StripedList>

        </div>
      </div>
    );
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
export default connect(null, mapDispatchToProps)(EngineHours);