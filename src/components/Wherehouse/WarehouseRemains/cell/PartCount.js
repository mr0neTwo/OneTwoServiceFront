import React from 'react'

import Icon from '../../../general/Icon'
import {ICON} from '../../../../data/icons'

const PartCount = (props) => {

    if (props.remain.min_residue) {
        return <td className='tac'>
            <span>{props.remain.min_residue > props.remain.count ? <Icon className='icon-s1' icon={ICON.WARNING} color='red'/> : null}</span>
            <span className='ml2'>{props.remain.count}</span>
        </td>
    } else {
        return <td className='tac'>{props.remain.count}</td>
    }
}

export default PartCount