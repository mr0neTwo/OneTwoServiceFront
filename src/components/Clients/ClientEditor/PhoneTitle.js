import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeClientEditorPhone} from '../../../Redux/actions/clientAction'
import {icon_down, icon_left} from '../../../data/icons'

import Icon from '../../general/Icon'

const PhoneTitle = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [titleStatus, setTitleStatus] = useState(false)

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes(`listOptionsOfPhones${props.idx}`)) {
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
        <div id={`listOptionsOfPhones${props.idx}`}>
            <div
                className="lableImput mt15 curP"
                onClick={() => setListVisible(!listVisible)}
            >
                {props.title}
                {props.idx === 0 ? <span className="redStar">*</span> : null}
                <Icon
                    className='icon-s1'
                    icon={listVisible ? icon_down : icon_left}
                />
            </div>

            {listVisible ? (
                <div className="listOptionsPhones">
                    {props.client.phone_titles.map(title => {
                        return (
                            <div
                                key={title}
                                className="options"
                                onClick={() => {
                                    props.changeClientEditorPhone(props.idx, 'title', title)
                                    setListVisible(false)
                                }}
                            >
                                {title}
                            </div>
                        )
                    })}
                    <div className="btmsts">
                        {titleStatus ? (
                            <input
                                className="optionFilterInput"
                                autoFocus
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        props.changeClientEditorPhone(props.idx, 'title', event.target.value)
                                        setTitleStatus(false)
                                        setListVisible(false)
                                    }
                                }}
                                placeholder="Введите и нажмиете Enter"
                            />
                        ) : (
                            <div
                                className="btnstsTitle"
                                onClick={() => setTitleStatus(true)}
                            >
                                Задать поле
                            </div>
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
