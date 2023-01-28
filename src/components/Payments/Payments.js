import React from 'react'
import {connect} from 'react-redux'

import {changeCashboxState} from '../../Redux/actions/cashboxAction'

import Tabs from '../general/Tabs'
import Cashboxes from './cashboxes/Cashboxes'
import Salaries from './salaries/Salaries'

import Header from '../Header/Header'

const Payments = (props) => {

    return (
        <div className='main-content'>
            <Header title='Финансы'/>

            <div className='content-container g15'>
                <Tabs
                    // list={['Платежи', 'Взаиморасчеты', 'Счета', 'Зарплаты']}
                    list={['Платежи', 'Зарплаты']}
                    func={idx => props.changeCashboxState({tabs: idx})}
                    tab={props.tabs}
                />
                {props.tabs === 0 ? <Cashboxes/> : null}
                {/*{props.tabs === 1 ? null : null}*/}
                {/*{props.tabs === 2 ? null : null}*/}
                {props.tabs === 1 ? <Salaries/> : null}

            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    tabs: state.cashbox.tabs,
    statusOrderLoader: state.view.statusOrderLoader

})

const mapDispatchToProps = {
    changeCashboxState
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)

