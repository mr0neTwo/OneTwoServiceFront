import React, {useEffect, useMemo, useState} from 'react'
import {connect} from 'react-redux'

import { changeVisibleState} from '../../Redux/actions'
import {addClients, changeClientState, getClient} from '../../Redux/actions/clientAction'
import {checkObject, showPhone, valueOfPhoneInput} from './utils'
import Icon from './Icon'
import {ICON} from '../../data/icons'


/**
 *
 * <SetClient
 * id='idElement'
 * setClient={client => console.log(client)}
 * client={props.client}
 * checkedFlag='flagName'
 * redStar={false}
 * disabled={false}
 * />
 *
 * id - id элеметна
 * setClient - Функция над объектом клиента
 * client -  текущий клиент
 * checkedFlag - имя флага для проверки
 * checked - ссылка на флаг
 * redStar - отображать красную звездочку
 * disabled - заблокировать
 *
 * @returns {JSX.Element}
 *
 */
const SetClient = (props) => {

    const [listVisible, setListVisible] = useState(false)

    const id = `SetClient${props.id}`

    const clickHandel = (event) => {
        if (
            !event.composedPath().map(el => el.id).includes(id) &&
            !event.composedPath().map(el => el.id).includes(props.id)
        ) {
            setListVisible(false)
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

    const handleNewClient = () => {
        if (!props.disabled) {
            props.changeClientState({ad_campaign: props.ad_campaign[0]})
            props.changeVisibleState({'statusClientEditor': true})
        }
    }

    const editClient = (client) => {
        if (!props.disabled) {
            props.getClient(client.id)
            // props.changeVisibleState({'statusClientEditor': true})
        }
    }

    const mainClassName = useMemo(() => {
        let className = 'select'
        if (props.className) className += ` ${props.className}`
        if (listVisible) className += ' select_active'
        if (props.disabled) className += ' select_disabled'
        if (!props.view[props.checkedFlag]) className += ' select_error'
        return className
    }, [props.className, listVisible, props.disabled, props.view])

    if (props.invisible) return <div/>

    if (checkObject(props.client)) {
        return (
            <div className={`client-card ${props.className}`}>
                <div className='label client-card_label'>Клиент</div>
                <div className = 'client-card__card'>
                    <div className='client-card__name-row'>
                        <div
                            id='newClient'
                            className='client-card__name'
                            onClick={() => editClient(props.client)}
                        >
                            <Icon
                                className='icon'
                                icon={ICON.CLIENT}
                            />
                            <div>{props.client.name}</div>
                        </div>
                        <div
                            className='client-card__icon-cancel'
                            onClick={props.disabled ? null : () => props.setClient({})}
                        >
                            <Icon
                                className='icon'
                                icon={ICON.CANCEL}
                            />
                        </div>
                    </div>

                    <div>
                        <span className=''>Телефон:</span>
                        <span className=''> {props.client.phone[0] ? showPhone(props.client.phone[0].number) : null}</span>
                    </div>
                    <div>
                        <span className=''>Баланс: </span>
                        <span className=''>000 (клиет должет нам)</span>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div
            id={id}
            className={mainClassName}
        >

            <div className='label select__label'>
                {'Имя клиента'}
                {props.redStar ? <span className={checkObject(props.client) ? '' : 'input-label__red-star'}>*</span> : null}
            </div>


            <div
                id={props.id}
                className='input select__input'
                onClick={() => setListVisible(true)}
            >
                <input
                    className='w100p'
                    onChange={event => props.changeClientState({filter_name: event.target.value})}
                    disabled={props.disabled}
                />
                <div
                    id='newClient'
                    onClick={handleNewClient}
                >
                    <Icon icon={ICON.PLUS} className='icon'/>
                </div>
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>

            {listVisible ?
                <div className='select__drop-list'>
                    <div className='select__drop-list-body'>
                        {props.clients.map(client => (
                            <div
                                className='select__item select__item_option select__item_client'
                                key={client.id}
                                onClick={() => {
                                    setListVisible(false)
                                    props.setClient(client)
                                    if (props.checkedFlag) props.changeVisibleState({[props.checkedFlag]: true})
                                }}
                            >
                                <div className='nowrap'>{client.name}</div>
                                <div className='select__item_phone'>
                                    {client.phone[0] ? showPhone(client.phone[0].number) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    clients: state.client.clients,
    filter_name: state.client.filter_name,
    view: state.view,
    ad_campaign: state.data.ad_campaign
})

const mapDispatchToProps = {
    getClient,
    changeClientState,
    changeVisibleState,
    addClients
}

export default connect(mapStateToProps, mapDispatchToProps)(SetClient)