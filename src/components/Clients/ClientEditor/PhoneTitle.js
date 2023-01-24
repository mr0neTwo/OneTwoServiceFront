import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeClientEditorPhone} from '../../../Redux/actions/clientAction'
import {ICON} from '../../../data/icons'

import Icon from '../../general/Icon'
import Button from '../../general/Button'

const PhoneTitle = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [titleStatus, setTitleStatus] = useState(false)

    const id = `phoneTitle${props.idx}`

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(id)) {
            setListVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    return (
        <div
            id={id}
        >
            <div
                className="label input-label__label_phone"
                onClick={() => setListVisible(!listVisible)}
            >
                {props.title}
                {props.idx === 0 ? <span className="redStar">*</span> : null}
                <Icon icon={ICON.DOWN} className={`icon icon_24 ${listVisible ? 'icon_rotate-90' : ''}`}/>
            </div>

            {listVisible ? (
                <div className="select__drop-list select__drop-list_full w150">
                    <div className='select__drop-list-body'>
                            {props.client.phone_titles.map(title => {
                                return (
                                    <div
                                        key={title}
                                        className="select__item_option"
                                        onClick={() => {
                                            props.changeClientEditorPhone(props.idx, 'title', title)
                                            setListVisible(false)
                                        }}
                                    >
                                        {title}
                                    </div>
                                )
                            })}
                    </div>
                    <div className="select__buttons">
                        {titleStatus ? (
                            <div className='select__add-input'>
                                <input
                                    className="select__add-input"
                                    autoFocus
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            props.changeClientEditorPhone(props.idx, 'title', event.target.value)
                                            setTitleStatus(false)
                                            setListVisible(false)
                                        }
                                    }}
                                />
                                <div className='select__add-input-text'>Введите название и нижмите Enter</div>
                            </div>
                        ) : (
                            <Button
                                size='small'
                                type='tertiary'
                                title='Задать поле'
                                onClick={() => setTitleStatus(true)}
                            />
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

const mapStateToProps = (state) => ({
    client: state.client,
})

const mapDispatchToProps = {
    changeClientEditorPhone
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneTitle)
