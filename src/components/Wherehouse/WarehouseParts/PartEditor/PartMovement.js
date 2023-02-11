import React, {useState} from 'react'
import { connect } from 'react-redux'

import {showDate} from '../../../general/utils'
import MultyButton from '../../../general/MultyButton'
import {getWriteOf} from '../../../../Redux/actions/writeOfAction'
import {getRegistration} from '../../../../Redux/actions/registrationAction'
import {getMovement} from '../../../../Redux/actions/warehouseMovementAction'
import {getBack} from '../../../../Redux/actions/warehouseBackActions'
import {Payment} from "../../../../data/data";
import Data from "../../../general/cell/Data";


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
        <div className='modal__block-forms'>
            <MultyButton
                name={['Все', 'Приход', 'Расход']}
                func1 ={() => setDirection(0)}
                func2 ={() => setDirection(Payment.Direction.OUTCOME)}
                func3 ={() => setDirection(Payment.Direction.INCOME)}
            />

            <table>
                <thead>
                    <tr>
                        <th className='th th_w160'>Документ</th>
                        <th className='th'>Описание</th>
                        <th className='th th_w70'>Приход</th>
                        <th className='th th_w70'>Расход</th>
                    </tr>
                </thead>
                <tbody>
                {part_movements.map(movement => (
                    <tr key={movement.id}>

                        <td>
                            <div>
                                <span>{`${movement.relatedObject.title} №`}</span>
                                <span
                                    className='cell_label'
                                    onClick={() => handleClick(movement)}
                                >
                                    {movement.relatedObject.label}
                                </span>
                            </div>
                            <div className='cs'>{showDate(movement.created_at)}</div>
                        </td>

                        <Data data={movement.description}/>
                        <td className='td td_green'>{movement.income || ''}</td>
                        <td className='td td_red'>{movement.outcome || ''}</td>
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