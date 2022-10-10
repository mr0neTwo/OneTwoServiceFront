import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import ClientEditor from '../Clients/ClientEditor/ClientEditor'

import { editCurrentClient, changeVisibleState} from '../../Redux/actions'
import {addClients, changeClientState} from '../../Redux/actions/clientAction'
import {showPhone} from './utils'
import Icon from './Icon'
import {icon_client, icon_down, icon_left} from '../../data/icons'


/**
 * id='idElement'
 *
 * title='title'
 *
 * setClient={client => console.log(client)} // Функция над объектом клиента
 *
 * client={props.client} // объект клиента в state
 *
 * @returns {JSX.Element}
 *
 */
const SetClient = (props) => {

    const [showList, setShowList] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes(`list${props.id}`) &&
            !event.path.map(el => el.id).includes(props.id)
        ) {
            setShowList(false)
        }
    }

    useEffect(() => {
        props.addClients()
    }, [props.filter_name])


    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const editClient = (client) => {
        props.editCurrentClient(client)
        props.changeVisibleState({'statusCreateNewClient': true})
    }

    if (Object.values(props.client).length) {
        return (
            <div className = 'mt15'>
                <div className = 'clientCard'>
                    <div>
                        <div>
                            <Icon
                                className='icon-client'
                                icon={icon_client}
                            />
                            <span
                                className='clientCardName'
                                onClick={() => editClient(props.client)}
                            >
                                {props.client.name}
                            </span>
                        </div>
                        <div>
                            <span className='clientCardTitle'>Телефон:</span>
                            <span className='clientCardText'> {props.client.phone[0] ? showPhone(props.client.phone[0].number) : null}</span>
                        </div>
                        <div>
                            <span className='clientCardTitle'>Баланс: </span>
                            <span className='clientCardText'>000 (клиет должет нам)</span>
                        </div>
                    </div>
                    <div
                        className='crossButtom'
                        onClick={() => props.setClient({})}
                    >
                        &#9587;
                    </div>
                </div>
                {props.view.statusCreateNewClient ? <ClientEditor/> : null }
            </div>
        )
    }

    return (
        <div className='w400 h52'>

            <div className='lableImput mt15'>{props.title || 'Имя клиента'}</div>

            <div className='blockImput'>
                <div
                    id={props.id}
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
                    <Icon
                        className='icon-s4'
                        icon={showList ? icon_left : icon_down}
                    />
                </div>

                {showList ?
                    <div className='listFilter' id={`list${props.id}`}>
                        {props.clients.map(client => (
                            <div
                                className='rowGropList'
                                key={client.id}
                                onClick={() => {
                                    setShowList(false)
                                    props.editCurrentClient(client)
                                    props.setClient(client)
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
    filter_name: state.client.filter_name,
    view: state.view
})

const mapDispatchToProps = {
    editCurrentClient,
    changeClientState,
    changeVisibleState,
    addClients
}

export default connect(mapStateToProps, mapDispatchToProps)(SetClient)