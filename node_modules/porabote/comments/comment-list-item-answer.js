import React from 'react'
import avatar from './svg/user_no-photo.svg';
import AnswerForm from './answer-form'
import moment from 'moment'

class CommentListItemAnswer extends React.Component {

    state = {
        isAnswerFormActive: false
    }

    showAnswerForm = () => {
        this.setState({
            isAnswerFormActive: true
        })
    }

    render() {

        let answers = this.props.parentGroups[this.props.data.id] || []

        return(
            <React.Fragment>
                <div className="comments__item">
                    <div className="comments__item-avatar">
                        <div className="comments__item-avatar-img"
                             style={{backgroundImage: `url(${avatar})`}}
                        >
                        </div>
                    </div>
                    <div className="comments__item-fio">
                        <span className="comments__item-fio__sender">
                            {`${this.props.data.user.name}`}
                        </span>
                        <span className="comments__listener-fio">
                            {`${this.props.parentMsg.user.name}`}
                        </span>
                    </div>
                    <div className="comments__item-date">
                        <time>
                            {moment(this.props.data.date_created).format("DD MMM YYYY в hh:mm")}
                        </time>
                    </div>
                    <div className="comments__item-title">
                        {this.props.data.msg}
                    </div>

                    <div className="comments__item-response">

                        <div
                            className="comments__item-response-link"
                            onClick={() => {
                                this.showAnswerForm()
                            }}
                        >
                            Ответить
                        </div>

                        <div className="comments__item-response-form">
                            <AnswerForm addUrl={this.props.addUrl} auth={this.props.auth} fetchComments={this.props.fetchComments} parentMsg={this.props.data} {...this.state} />
                        </div>

                        <div className="on_comments__item__sub-items container sub on_comments__item__childs-container">
                            {
                                answers.map((item, index) => {
                                    return(
                                        <CommentListItemAnswer
                                            addUrl={this.props.addUrl}
                                            auth={this.props.auth}
                                            key={index}
                                            parentMsg={this.props.data}
                                            answers={item.children}
                                            data={item.attributes}
                                            fetchComments={this.props.fetchComments}
                                            parentGroups={this.props.parentGroups}
                                        />
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default CommentListItemAnswer