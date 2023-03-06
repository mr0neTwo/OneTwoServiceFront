import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../Redux/actions'
import {deletePayment, resetPayments} from '../../Redux/actions/paymentAction'
import Receipt from './Receipt'
import BottomButtons from '../general/BottomButtons'

const PaymentCard = (props) => {

    const componentId = 'PaymentCard'

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(componentId)) {
            props.changeVisibleState({isCentralModalOpen: false, modalCentralType: ''})
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const title = ['Перемещение денег', 'Расход денег', 'Приход денег']


    return (
            <div className="modal__box modal__box_editor" id={componentId}>
                <div className='modal__block-forms w350'>

                    <h3>{title[props.payment.direction]}</h3>

                    <div className='modal__body modal__body-editor'>

                        <Receipt/>

                        <Clause
                            title='Форма оплаты:'
                            text={props.payment.cashbox.type ? 'Безналичная' : 'Наличная'}
                        />
                        <Clause
                            title='Касса:'
                            text={props.payment.cashbox.title}
                        />
                        {props.payment.cashflow_category ?
                            <Clause
                                title='Статья:'
                                text={props.payment.cashflow_category}
                            /> : null}
                        {Object.values(props.payment.client).length ?
                            <Clause
                                title='Клиет:'
                                text={props.payment.client.name}
                            /> : null}
                        <Clause
                            title='Кассир:'
                            text={props.payment.employee.name}
                        />
                    </div>

                    <BottomButtons
                        edit={props.payment.edit}
                        delete={props.permissions.includes('delete_payments') ? () => props.deletePayment(true) : null}
                        recover={props.permissions.includes('recover_payments') ? () => props.deletePayment(false) : null}
                        close={() => {
                            props.changeVisibleState({statusPaymentsCard: false})
                            props.resetPayments()
                        }}
                        deleted={props.payment.deleted}
                    />
                </div>
            </div>
    )
}

const Clause = (props) => {
    return (
        <div className='row g6'>
            <span>{props.title}</span>
            <span>{props.text}</span>
        </div>
    )
}


const mapStateToProps = state => ({
    payment: state.payment,
    cashboxes: state.cashbox.cashboxes,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeVisibleState,
    resetPayments,
    deletePayment
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard)