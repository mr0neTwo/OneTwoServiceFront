import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

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
 * checkedFlag='flagName'
 *
 * checked={props.view.flagName}
 *
 * redStar={false}
 *
 * errorMassage='errorMassage'
 *
 * disabled={false}
 *
 * @returns {JSX.Element}
 *
 */
const SetClient = (props) => {

    const [showList, setShowList] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.composedPath().map(el => el.id).includes(`list${props.id}`) &&
            !event.composedPath().map(el => el.id).includes(props.id)
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
        if (!props.disabled) {
            props.editCurrentClient(client)
            props.changeVisibleState({'statusClientEditor': true})
        }
    }
    if (props.invisible) return <div/>

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
                        onClick={props.disabled ? null : () => props.setClient({})}
                    >
                        &#9587;
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='w400 h52'>

            <div className='lableImput mt15'>{props.title || 'Имя клиента'}{props.redStar ? <span className='redStar'>*</span> : null}</div>

            <div className='blockInput'>
                <div
                    id={props.id}
                    className='orderInputBox'
                    style={{borderColor: props.checkedFlag && !props.checked  ? 'red' : null}}
                    onClick={() => setShowList(true)}
                >
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changeClientState({filter_name: event.target.value})}
                        disabled={props.disabled}
                    />
                    <div
                        className='simbolButton'
                        onClick={props.disabled ? null : () => props.changeVisibleState({'statusClientEditor': true})}
                    >
                        +
                    </div>
                    <Icon
                        className='icon-s4'
                        icon={showList ? icon_left : icon_down}
                    />
                </div>
                {props.checkedFlag && !props.checked ? <div className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необходимо выбрать'}</div> : null}

                {showList ?
                    <div className='listFilter' id={`list${props.id}`}>
                        {props.clients.map(client => (
                            <div
                                className='rowGropList'
                                key={client.id}
                                onClick={() => {
                                    setShowList(false)
                                    // props.editCurrentClient(client)
                                    props.setClient(client)
                                    if (props.checkedFlag) props.changeVisibleState({[props.checkedFlag]: true})
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