import React, {useState} from 'react'
import { connect } from 'react-redux'

import {changePartProperty, deletePartProperty} from '../../../Redux/actions/partAction'
import Icon from '../../general/Icon'
import {ICON} from '../../../data/icons'

const Property = (props) => {

    const [titleVisible, setTitleVisible] = useState(!props.title)
    const [valueVisible, setValueVisible] = useState(!props.value)

    const disabled = props.part.deleted

    return (
        <tr className='tr tr_tools'>
            <td className='td'>
                {titleVisible && !disabled ?
                    <input
                        onChange={event => props.changePartProperty(event.target.value, props.idx, 'title')}
                        value={props.title}
                        autoFocus={true}
                        onBlur={() => setTitleVisible(!props.title)}
                        onKeyPress={event => {if (event.key === 'Enter') setTitleVisible(!props.title)}}
                        placeholder='Свойство'
                    />
                    :
                    <div
                        className='w100'
                        onDoubleClick={() => setTitleVisible(true)}
                    >
                        {props.title}
                    </div>
                }
            </td>
            <td className='td'>
                {valueVisible && !disabled ?
                    <input
                        onChange={event => props.changePartProperty(event.target.value, props.idx, 'value')}
                        value={props.value}
                        autoFocus={true}
                        onBlur={() => setValueVisible(!props.value)}
                        onKeyPress={event => {if (event.key === 'Enter') setValueVisible(!props.value)}}
                        placeholder='Значение'
                    />
                    :
                    <div
                        className='ml30'
                        onDoubleClick={() => setValueVisible(true)}
                    >
                        {props.value}
                    </div>
                }
            </td>
            <td
                className='td td_red cur-p'
                onClick={disabled ? null : () => props.deletePartProperty(props.idx)}
            >
                <Icon icon={ICON.TRASH} className='icon'/>
            </td>

        </tr>
    )
}

const mapStateToProps = state => ({
     part: state.part
})

const mapDispatchToProps = {
    changePartProperty,
    deletePartProperty
}

export default  connect(mapStateToProps, mapDispatchToProps)(Property)