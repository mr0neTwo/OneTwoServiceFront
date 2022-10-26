import React from 'react'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'

import Button from './Button'
import {changeVisibleState} from '../../Redux/actions'

const ResNotFound = (props) => {

    const history = useHistory()

    const handleToOrders = () => {
        history.push('/orders')
    }

    const handleBack = () => {
        history.goBack()
    }

    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix w500' id='resNotFound'>
                <img
                    src='/resNotFound.png'
                />

                <div className='row mt15 w100 jc-c'>
                    <Button
                        className='blueButton'
                        title='К заказам'
                        onClick={handleToOrders}
                    />
                    <Button
                        className='whiteBlueBotton ml15'
                        title='Назад'
                        onClick={handleBack}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(ResNotFound)