import React from 'react'
import { Form, Field, Input, InputHidden, SubmitButton, Button } from 'porabote/form'

class ButtonUploadPreviewPanel extends React.Component {

    state = {
        values: {}
    }

    allowExtensions = {
        // images
        'image/png': 'png',
        'image/jpeg': 'jpe',
        'image/jpeg': 'jpeg',
        'image/jpeg': 'jpg',
        'image/gif': 'gif',
        'image/bmp': 'bmp',
        'image/vnd.microsoft.icon': 'ico',
        'image/tiff': 'tiff',
        'image/tiff': 'tif',
        'image/svg+xml': 'svg',
        'image/svg+xml': 'svgz',
        // archives
        'application/zip': 'zip',
        'application/x-rar-compressed': 'rar',
        // audio/video
        'audio/mpeg': 'mp3',
        'video/quicktime': 'qt',
        'video/quicktime': 'mov',
        // adobe
        'application/pdf': 'pdf',
        'image/vnd.adobe.photoshop': 'psd',
        'application/postscript': 'ai',
        'application/postscript': 'eps',
        // ms office
        'application/msword': 'doc',
        'application/msword': 'dot',
        'application/rtf': 'rtf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.template': 'dotx',
        'application/vnd.ms-word.document.macroEnabled.12': 'docm',
        'application/vnd.ms-word.template.macroEnabled.12': 'dotm',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.ms-excel': 'xlt',
        'application/vnd.ms-excel': 'xla',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.template': 'xltx',
        'application/vnd.ms-excel.sheet.macroEnabled.12': 'xlsm',
        'application/vnd.ms-excel.template.macroEnabled.12': 'xltm',
        'application/vnd.ms-excel.addin.macroEnabled.12': 'xlam',
        'application/vnd.ms-excel.sheet.binary.macroEnabled.12': 'xlsb',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.ms-powerpoint': 'pot',
        'application/vnd.ms-powerpoint': 'pps',
        'application/vnd.ms-powerpoint': 'ppa',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'application/vnd.openxmlformats-officedocument.presentationml.template': 'potx',
        'application/vnd.openxmlformats-officedocument.presentationml.slideshow': 'ppsx',
        'application/vnd.ms-powerpoint.addin.macroEnabled.12': 'ppam',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12': 'pptm',
        'application/vnd.ms-powerpoint.template.macroEnabled.12': 'potm',
        'application/vnd.ms-powerpoint.slideshow.macroEnabled.12': 'ppsm',
        'application/vnd.ms-access': 'mdb',
        'text/csv': 'csv',
        // open office
        'application/vnd.oasis.opendocument.text': 'odt',
        'application/vnd.oasis.opendocument.spreadsheet': 'ods'
    }

    uploadAfterPreview = (values) => {

        const formData = new FormData();

        for (let key in values.files) {
            for (let fieldName in values.files[key]) {
                formData.append(`files[${key}][${fieldName}]`, values.files[key][fieldName])
            }
        }

        this.props.uploadAfterPreview(formData, { removeModalItem: this.props.removeModalItem, modalKey: this.props.itemkey})
    }

    getPreviewImg = (file) => {

        let href = URL.createObjectURL(file)


        let typeSplits = file.type.split('/');

        if (typeSplits[0] == 'image') {
            return(
                <div className="upload-panel-file-pre img" style={{
                    backgroundImage: `url(${href})`,
                }}></div>
            )
        } else {
            return (
                <div className="upload-panel-file-pre other">
                    .{this.allowExtensions[file.type]}
                </div>
            )
        }

    }

    render() {

        let values = {}

        let fields = this.props.fields.props.children;
        if (!Array.isArray(fields)) fields = [fields]

        let files = {}
        for (let key in this.props.files) {

            if (typeof  this.props.files[key] === "object" && this.props.files[key] instanceof File) {
                files[key] = {
                    file: this.props.files[key]
                }
            }
        }

        return(
            <Form
                submitForm={this.uploadAfterPreview}
                values={{ files }}
            >
                <div>
                    {Object.keys(this.props.files).map((index) => {

                        let file = this.props.files[index]

                        return(
                            <div className="upload-panel-file" key={index}>
                                <div className="upload-panel-file-name">Имя: {`${file.name}`}</div>
                                <div className="upload-panel-file-size">Размер: {`${Math.round(file.size / 1024)}`} KB</div>
                                {this.getPreviewImg(file)}
                                <div className="upload-panel-file-fields">
                                    {
                                        fields.map((field, fieldIndex) => {
                                            return(
                                                React.cloneElement(field, {
                                                    key: fieldIndex,
                                                    name: `files.${index}.${field.props.children.props.name}`
                                                })
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>

                <SubmitButton>
                    <Button
                        text="Загрузить"
                        className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                        type="button"
                        style={{width: '140px', marginTop: '20px'}}
                    />
                </SubmitButton>

            </Form>
        )
    }
}

export default ButtonUploadPreviewPanel