import React from 'react'
import CommentListItem from './comment-list-item'

class CommentList extends React.Component {

    parentGroups = {}

    setNestedList = () => {

        let data = this.props.data.filter((item, index) => {
           
            if (item.attributes.parent_id !== null) {

                if (typeof this.parentGroups[item.attributes.parent_id] == "undefined") {
                    this.parentGroups[item.attributes.parent_id] = [];
                }

                this.parentGroups[item.attributes.parent_id][item.id] = item;

            } else {
                return true;
            }
        });

        data.map((item, index) => {
            item['children'] = [];
            this.setChildren(item)
        })

        return data ;
    }

    setChildren = (item) => {
        if (typeof this.parentGroups[item.id] !== "undefined") {
            item.children = this.parentGroups[item.id];
            this.parentGroups[item.id].map(child => {
                this.setChildren(child)
            })
        }
    }

    render() {

        if (this.props.loading) return <div className="empty-data">Комментарии загружаются...</div>

        if (this.props.data.length == 0) return <div className="empty-data">Комментарии не добавлялись</div>

        let data = this.setNestedList()

        return(
            <div className="comments__items">
                {data.map((item, index) => {
                    return <CommentListItem
                        addUrl={this.props.addUrl}
                        auth={this.props.auth}
                        key={index}
                        answers={item.children}
                        data={{user: item.relationships.user.attributes, ...item.attributes}}
                        fetchComments={this.props.fetchComments}
                        parentGroups={this.parentGroups}
                    />
                })}
            </div>
        )
    }
}

export default CommentList