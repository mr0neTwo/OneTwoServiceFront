import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import { editCurrentClient, changeVisibleState} from '../../Redux/actions'
import {changePaymentForm} from '../../Redux/actions/paymentAction'
import {showPhone} from '../general/utils'
import ClientEditor from '../Clients/ClientEditor/ClientEditor'
import {changeClientState} from '../../Redux/actions/clientAction'

const SetClientByName = (props) => {

    const [showList, setShowList] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes('listClientsOfOfPayments') &&
            !event.path.map(el => el.id).includes('clientInputBoxOfPayments')
        ) {
            setShowList(false)
        }
    }


    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    return (
        <div className='w400 h52'>

            <div className='lableImput mt15'>Имя клиента</div>

            <div className='blockImput'>
                <div
                    id='clientInputBoxOfPayments'
                    className='orderInputBox'
                    onClick={() => setShowList(true)}
                >
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changeClientState({filter_name: event.target.value})}
                    />
                    <div
                        className='simbolButton'
                        onClick={() => props.changeVisibleState({'statusCreateNewClient': true})}
                    >
                        +
                    </div>
                    <div className='simbolButton'>&#6662;</div>
                </div>

                {showList ?
                    <div className='listFilter' id='listClientsOfOfPayments'>
                        {props.clients.map(client => (
                            <div
                                className='rowGropList'
                                key={client.id}
                                onClick={() => {
                                    setShowList(false)
                                    props.editCurrentClient(client)
                                    props.changePaymentForm(client.id, 'client_id')
                                }}
                            >
                                <div>{client.name}</div>
                                <div className='orderDate'>
                                    {client.phone[0] ? showPhone(client.phone[0].number) : null}
                                </div>
                            </div>
                        ))}
                    </div> : null}

            </div>


            {props.view.statusCreateNewClient ? <ClientEditor/> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    clients: state.client.clients,
    phone: state.filter.clientFilter.phone,
    view: state.view,
    client: state.order.client
})

const mapDispatchToProps = {
    changePaymentForm,
    editCurrentClient,
    changeClientState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetClientByName)