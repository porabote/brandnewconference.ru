import React from 'react'
import avatar from './svg/user_no-photo.svg';
import AnswerForm from './answer-form'
import CommentListItemAnswer from './comment-list-item-answer'
import moment from 'moment'

class CommentListItem extends React.Component {

    state = {
        isAnswerFormActive: false
    }

    showAnswerForm = () => {
        this.setState({
            isAnswerFormActive: true
        })
    }

    render() {

        return(
            <div className="comments__item">
                <div className="comments__item-avatar">
                    <div className="comments__item-avatar-img"
                         style={{backgroundImage: `url(${avatar})`}}
                    >
                    </div>
                </div>
                <div className="comments__item-fio">
                    <span className="comments__item-fio__sender">{`${this.props.data.user.name}`}</span>
                    <span className="comments__listener-fio hide"></span>
                </div>
                <div className="comments__item-date">
                    <time>
                        {moment(this.props.data.date_created).format("DD MMM YYYY в hh:mm")}
                    </time>
                </div>
                <div className="comments__item-title" dangerouslySetInnerHTML={{__html: this.props.data.msg}}>
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
                        <AnswerForm
                            addUrl={this.props.addUrl}
                            auth={this.props.auth}
                            fetchComments={this.props.fetchComments}
                            parentMsg={this.props.data}
                            {...this.state}
                        />
                    </div>

                    <div className="comments__item__sub-items container sub comments__item__childs-container">
                        {
                            this.props.answers.map((item, index) => {
                                return(
                                    <CommentListItemAnswer
                                        addUrl={this.props.addUrl}
                                        auth={this.props.auth}
                                        key={index}
                                        data={{user: item.relationships.user.attributes, ...item.attributes}}
                                        parentMsg={this.props.data}
                                        fetchComments={this.props.fetchComments}
                                        parentGroups={this.props.parentGroups}
                                    />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        )
    }
}

export default CommentListItem