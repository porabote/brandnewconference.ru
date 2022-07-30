import React, { Component } from 'react'
import Feed from './feed'
import PaymentsSetsView from './payments-sets-view'

class PaymentsSets extends Component {

    render() {

        if (this.props.match.params.action === 'view') {
            return <PaymentsSetsView/>
        }

        return(
            <Feed/>
        )
    }
}

export default PaymentsSets