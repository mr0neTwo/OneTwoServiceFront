import React, {useState} from 'react'
import { connect } from 'react-redux'

import {showDate} from '../../../general/utils'
import MultyButton from '../../../general/MultyButton'
import {getWriteOf} from '../../../../Redux/actions/writeOfAction'
import {getRegistration} from '../../../../Redux/actions/registrationAction'
import {getMovement} from '../../../../Redux/actions/warehouseMovementAction'
import {getBack} from '../../../../Redux/actions/warehouseBackActions'


const PartMovement = (props) => {

    const [direction, setDirection] = useState(0)

    let part_movements = props.part.part_movements.filter(movement => !direction || movement.direction === direction)

    if (!props.permissions.includes('see_registrations'))
        part_movements = part_movements.filter(movement => movement.relatedObject.type !== 0)

    if (!props.permissions.includes('write_of_warehouse'))
        part_movements = part_movements.filter(movement => movement.relatedObject.type !== 1)

    if (!props.permissions.includes('see_move_warehouse'))
        part_movements = part_movements.filter(movement => movement.relatedObject.type !== 3)

    if (!props.permissions.includes('see_refund_to_supplier'))
        part_movements = part_movements.filter(movement => movement.relatedObject.type !== 4)

    const handleClick = (movement) => {

        switch (movement.relatedObject.type) {
            case 0:
                props.getRegistration(movement.relatedObject.doc_id)
                break
            case 1:
                props.getWriteOf(movement.relatedObject.doc_id)
                break
            case 3:
                props.getMovement(movement.relatedObject.doc_id)
                break
            case 4:
                props.getBack(movement.relatedObject.doc_id)
                break
            default: console.log(movement)
        }
    }

    return (
        <div className=''>
            <MultyButton
                className='mt15'
                name={['Все', 'Приход', 'Расход']}
                func1 ={() => setDirection(0)}
                func2 ={() => setDirection(2)}
                func3 ={() => setDirection(1)}
            />

            <table className='mt15'>
                <thead>
                    <tr>
                        <th className='w150'>Документ</th>
                        <th className='w300'>Описание</th>
                        <th className='w70'>Приход</th>
                        <th className='w70'>Расход</th>
                    </tr>
                </thead>
                <tbody>
                {part_movements.map(movement => (
                    <tr key={movement.id}>

                        <td>
                            <div>
                                <span>{`${movement.relatedObject.title} №`}</span>
                                <span
                                    className='link'
                                    onClick={() => handleClick(movement)}
                                >
                                    {movement.relatedObject.label}
                                </span>
                            </div>
                            <div className='orderDate'>{showDate(movement.created_at)}</div>
                        </td>

                        <td className='wsn pd5'>{movement.description}</td>
                        <td className='tac'>{movement.income || ''}</td>
                        <td className='tac'>{movement.outcome || ''}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    view: state.view,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    getWriteOf,
    getRegistration,
    getMovement,
    getBack
}

export default connect(mapStateToProps, mapDispatchToProps)(PartMovement)