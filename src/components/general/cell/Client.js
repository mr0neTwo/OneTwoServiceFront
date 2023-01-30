import React from 'react'
import { connect } from 'react-redux'

import {showPhone} from '../utils'
import Button from '../Button'
import {ICON} from '../../../data/icons'


const Client = props => {

    if (!props.permissions.includes('see_client')) return <td/>

    return  (
        <td className='p-r'>
            <div className='cell cell_client'>
                <div className="cell_client_title">{props.client.name}</div>
                <div className="client-phones-container">
                    {props.client.phone.map(phone => (
                        <div key={phone.id} className='client-phone'>
                           <div className='nowrap'>{showPhone(phone.number)}</div>

                            <Button
                                size='small'
                                type='tertiary'
                                onClick={() => console.log('MESSAGE')}
                                icon={ICON.MESSAGE}
                            />
                            <Button
                                size='small'
                                type='tertiary'
                                onClick={() => console.log('CALL')}
                                icon={ICON.CALL}
                            />

                        </div>
                    ))}
                </div>
            </div>

        </td>
    )
}

const mapStateToProps = state => ({
    permissions: state.data.user.role.permissions
})

export default connect(mapStateToProps)(Client)