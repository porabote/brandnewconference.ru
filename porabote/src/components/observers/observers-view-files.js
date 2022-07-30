import React, { Component } from 'react'
import { FILES_URL } from '@services/constants'
import { ButtonUpload } from 'porabote/form'
import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list'
import { Field, Textarea, InputHidden } from 'porabote/form'
import moment from 'moment'

class ObserversViewFiles extends Component {

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
                                        href={`${FILES_URL}${file.attributes.uri}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {file.attributes.basename}
                                    </a>
                                </StripedListCell>
                                <StripedListCell>
                                    {moment(file.attributes.created_at).format("DD MMM YYYY HH:mm")}
                                </StripedListCell>
                                <StripedListCell>
                                    {file.attributes.dscr}
                                </StripedListCell>
                            </StripedListRow>
                        )
                    })}
                </StripedList>

                <div style={{marginTop: '50px'}}></div>
                <ButtonUpload
                    progressBar={false}
                    uri='/api/observers/method/uploadReportFile/'
                    previewPanel={() => {
                        return(
                            <div>
                                <Field>
                                    <Textarea grid="flex" label="Комментарий" name="dscr" />
                                </Field>

                                <Field>
                                    <InputHidden name="record_id" defaultValue={this.props.data.id} />
                                </Field>
                                
                                <Field>
                                    <InputHidden name="model_alias" defaultValue="observers" />
                                </Field>
                            </div>
                        )
                    }}
                    afterUpload={(response, params) => {
                        
                        this.props.fetchRecord()
                        params.removeModalItem(params.modalKey);
                    }}
                >
                    <span>Загрузить отчет</span>
                </ButtonUpload>
                
                <div style={{paddingBottom: '20px'}}></div>

            </div>
        )
    }
}

export default ObserversViewFiles