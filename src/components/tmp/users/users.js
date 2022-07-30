import React, { Component } from 'react'
import Feed from './feed'
import View from './view'
import ConfirmInvitation from "./confirm-invitation";

class Users extends Component {

    render() {

        const { action } = this.props.match.params;

        if (action === 'view') {
            return <View/>
        } else if (action == "confirmInvitation") {
            return <ConfirmInvitation/>
        }

        return(
            <Feed/>
        )
    }
}

export default Users