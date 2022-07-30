import React, { Component } from 'react'
import { ButtonUpload } from 'porabote/form'
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list'

class PaymentsSetsViewFiles extends Component {

    render() {

        return(
            <div>

                {this.props.files.data.length == 0 &&
                    <p className="no_records">Записи не найдены</p>
                }

                <StripedList style={{gridTemplateColumns: '500px 200px 1fr'}}>
                    {this.props.files.data.map((file, index) => {
                        return(
                            <StripedListRow key={index}>
                                <StripedListCell>
                                    <a
                                        href={`https://api.porabote.ru${file.attributes.uri}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {file.attributes.basename}
                                    </a>
                                </StripedListCell>
                                <StripedListCell>
                                    {file.attributes.created_at}
                                </StripedListCell>
                                <StripedListCell>
                                    {file.title}
                                </StripedListCell>
                            </StripedListRow>
                        )
                    })}
                </StripedList>

                <div style={{marginTop: '50px'}}></div>
                <ButtonUpload
                    progressBar={false}
                    uri='/api/files/upload/'
                    data={{
                        record_id: this.props.data.id,
                        model_alias: 'payments-sets'
                    }}
                    afterUpload={response => {
                        this.props.fetchRecord()
                        console.log(response);
                        // this.setState({
                        //     files: e.target.files
                        // })
                    }}
                >
                    <span>Загрузить отчет</span>
                </ButtonUpload>
                
                <div style={{paddingBottom: '20px'}}></div>

            </div>
        )
    }
}

export default PaymentsSetsViewFiles