import React from "react";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EquipmentsAccidentsAdd from "./equipments-accidents-add";
import { connect } from "react-redux";
import DateTime from "porabote/date-time";
import {
    Form,
    Field,
    Select,
    Option,
} from "porabote/form";
import moment from "moment";

class Accidents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date_at: '1900',
            date_to: '4999',
            months: DateTime.monthsList,
        };
    }

    render() {

        let years = {};
        const equipment_accidents  = this.props.record.relationships.equipment_accidents || [];
        return(
            <div style={{display: 'grid', gridTemplateColumns: '200px 40px 1fr'}}>

                <div>

                    <h3 style={{padding: '10px 0 10px 0'}}>Фильтр</h3>

                    <Form
                        values={{
                            date: '',
                            date: '',
                        }}
                    >
                        <Field>
                            <Select
                                name="date"
                                label="Дата с"
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
                                name="date"
                                label="Дата по"
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
                    <h3 style={{padding: '20px 0 10px 0'}}>Запись аварий</h3>
                    <StripedList key={1} style={{gridTemplateColumns: '40px 90px 90px 1fr 80px 1fr 40px'}}>
                        <StripedListRow key={99}>
                            <StripedListCell><b>ID</b></StripedListCell>
                            <StripedListCell><b>Дата</b></StripedListCell>
                            <StripedListCell><b>№ акта</b></StripedListCell>
                            <StripedListCell><b>Сущность аварии</b></StripedListCell>
                            <StripedListCell><b>Время простоя (ч)</b></StripedListCell>
                            <StripedListCell><b>Причины</b></StripedListCell>
                            <StripedListCell>

                                <div
                                    className="link_with_icon"
                                    onClick={() => {
                                        this.props.pushItemToModal(
                                            <EquipmentsAccidentsAdd
                                                getRecord={this.props.getRecord}
                                                record={this.props.record}
                                            />,
                                            'Добавить запись об аварии',
                                        );
                                    }}
                                >
                                    <AddIcon/>
                                </div>

                            </StripedListCell>
                        </StripedListRow>
                        {equipment_accidents.map((item, index) => {

                            const attrs = item.attributes;

                            return (
                                <StripedListRow key={index}>
                                    <StripedListCell>{item.id}</StripedListCell>
                                    <StripedListCell>{moment(attrs.date).format("DD-MM-Y")}</StripedListCell>
                                    <StripedListCell>{attrs.act_number}</StripedListCell>
                                    <StripedListCell>{attrs.details}</StripedListCell>
                                    <StripedListCell>{attrs.downtime}</StripedListCell>
                                    <StripedListCell>{attrs.reasons}</StripedListCell>
                                    <StripedListCell>
                                        <div
                                          className="link_with_icon"
                                          onClick={() => {
                                              this.props.pushItemToModal(
                                                <EquipmentsAccidentsAdd
                                                  getRecord={this.props.getRecord}
                                                  record={this.props.record}
                                                  data={attrs}
                                                />,
                                                'Добавить аварию',
                                              );
                                          }}
                                        >
                                            <EditIcon style={{fontSize: '18px'}}/>
                                        </div>
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
        pushItemToModal: (content, title) => dispatch({type: 'PUSH_MODAL_ITEM', payload: {title, content}}),
    }
}
export default connect(null, mapDispatchToProps)(Accidents);