import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

import {showDate} from '../../../general/utils'
import ChooseButton from '../../../general/ChooseButton'
import MultyButton from '../../../general/MultyButton'


const PartMovement = (props) => {

    const [direction, setDirection] = useState(0)

    const location = useLocation()
    const list_type = ['registration']

    const part_movements = props.part.part_movements.filter(movement => !direction || movement.direction === direction)

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
                        {/*<th>Создан</th>*/}
                        <th className='w150'>Документ</th>
                        <th className='w300'>Описание</th>
                        <th className='w70'>Приход</th>
                        <th className='w70'>Расход</th>
                    </tr>
                </thead>
                <tbody>
                {part_movements.map(movement => (
                    <tr key={movement.id}>

                        {/*<td>*/}
                        {/*    <div>{movement.employee.name}</div>*/}
                        {/*    <div>{showDate(movement.created_at)}</div>*/}
                        {/*</td>*/}

                        <td>
                            <div>
                                <span>{`${movement.relatedObject.title} №`}</span>
                                <Link
                                    className='orderLink'
                                    to={{
                                        pathname: `/warehouse/${list_type[movement.relatedObject.type]}${movement.relatedObject.doc_id}`,
                                        state: { prevPath: location.pathname }
                                    }}
                                >
                                    {movement.relatedObject.label}
                                </Link>
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
    part: state.part
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PartMovement)