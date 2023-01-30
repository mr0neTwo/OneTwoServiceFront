import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState, setVisibleListFlag,} from '../../../Redux/actions'
import {changeClientState, createClient, deleteClient, resetClient, saveChangeClient} from '../../../Redux/actions/clientAction'

import BottomButtons from '../../general/BottomButtons'

import {check0_100} from '../../general/utils'
import ClientBalans from './ClientBalans'
import ClientCalls from './ClientCalls'
import ClientInfo from './ClientInfo'
import ClientLeads from './ClientLeads'
import ClientOrder from './ClientOrder'
import ClientPayments from './ClientPayments'
import ClientSMS from './ClientSMS'
import ClientTask from './ClientTask'
import Tabs from '../../general/Tabs'

const ClientEditor = (props) => {

    const id = 'ClientEditor'

    const handleClose = () => {
        props.resetClient()
        props.changeVisibleState({
            statusClientEditor: false,
            inputClientNameChecked: true,
            inputClientDiscMatChecked: true,
            inputClientDiscGoodChecked: true,
            inputClientDiscServChecked: true,
            inputClientPhoneChecked: [true]
        })
    }
    
    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes(id) &&
            !event.composedPath().map((el) => el.id).includes('newClient')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreateClient = () => {
        if (
            props.client.name &&
            props.client.phone.every(phone => phone.number.replace(/[^0-9]/g, '').length === 11) &&
            check0_100(props.client.discount_materials) &&
            check0_100(props.client.discount_goods) &&
            check0_100(props.client.discount_services)
        ) {
            props.createClient()
        } else {
            if (!props.client.name) {
                props.changeVisibleState({inputClientNameChecked: false})
            }
            if (!check0_100(props.client.discount_materials)) {
                props.changeVisibleState({inputClientDiscMatChecked: false})
            }
            if (!check0_100(props.client.discount_goods)) {
                props.changeVisibleState({inputClientDiscGoodChecked: false})
            }
            if (!check0_100(props.client.discount_services)) {
                props.changeVisibleState({inputClientDiscServChecked: false})
            }
            props.client.phone.forEach((phone, idx) => {
                if (phone.number.replace(/[^0-9]/g, '').length !== 11) {
                    props.setVisibleListFlag('inputClientPhoneChecked', idx, false)
                }
            })
        }
    }

    const handelSaveClient = () => {
        if (
            props.client.name &&
            props.view.inputClientPhoneChecked.every((ph) => ph) &&
            check0_100(props.client.discount_materials) &&
            check0_100(props.client.discount_goods) &&
            check0_100(props.client.discount_services)
        ) {
            props.saveChangeClient()
        } else {
            if (!props.client.name) {
                props.changeVisibleState({inputClientNameChecked: false})
            }
            if (!check0_100(props.client.discount_materials)) {
                props.changeVisibleState({inputClientDiscMatChecked: false})
            }
            if (!check0_100(props.client.discount_goods)) {
                props.changeVisibleState({inputClientDiscGoodChecked: false})
            }
            if (!check0_100(props.client.discount_services)) {
                props.changeVisibleState({inputClientDiscServChecked: false})
            }
            props.client.phone.forEach((phone, idx) => {
                if (phone.number.replace(/[^0-9]/g, '').length !== 11) {
                    props.setVisibleListFlag('inputClientPhoneChecked', idx, false)
                }
            })
        }
    }

    return (
        <div className="modal modal_z20">
            <div className="modal__box modal__box_editor" id={id}>
                <h4>{props.client.edit ? props.client.name : 'Новый клиент'}</h4>

                <div className='modal__body modal__body-client'>
                    {/*{props.client.edit ?*/}
                    {/*    <div>*/}
                    {/*        <Tabs*/}
                    {/*            list={['Общие', 'Баланс', 'Обращения', 'Заказы', 'Платежи', 'Звонки', 'SMS', 'Задачи']}*/}
                    {/*            tab={props.client.tabs}*/}
                    {/*            func={idx => props.changeClientState({tabs: idx})}*/}
                    {/*        />*/}
                    {/*        {props.client.tabs === 0 ? <ClientInfo/> : null}*/}
                    {/*        {props.client.tabs === 1 ? <ClientBalans/> : null}*/}
                    {/*        {props.client.tabs === 2 ? <ClientLeads/> : null}*/}
                    {/*        {props.client.tabs === 3 ? <ClientOrder /> : null}*/}
                    {/*        {props.client.tabs === 4 ? <ClientPayments /> : null}*/}
                    {/*        {props.client.tabs === 5 ? <ClientCalls /> : null}*/}
                    {/*        {props.client.tabs === 6 ? <ClientSMS /> : null}*/}
                    {/*        {props.client.tabs === 7 ? <ClientTask /> : null}*/}
                    {/*    </div>*/}
                    {/*    :*/}
                        <ClientInfo/>
                {/*        }*/}
                </div>

                <BottomButtons
                    edit={props.client.edit}
                    create={handleCreateClient}
                    save={handelSaveClient}
                    delete={props.permissions.includes('delete_client') ? () => props.deleteClient(true) : null}
                    recover={props.permissions.includes('recover_client') ? () => props.deleteClient(false) : null}
                    close={handleClose}
                    deleted={props.client.deleted}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    view: state.view,
    client: state.client,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    changeVisibleState,
    resetClient,
    setVisibleListFlag,
    createClient,
    saveChangeClient,
    deleteClient,
    changeClientState
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientEditor)
