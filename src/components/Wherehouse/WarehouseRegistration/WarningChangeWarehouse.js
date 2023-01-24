import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {changeRegistrationState} from '../../../Redux/actions/registrationAction'

import WarningOrange from '../../general/WarningOrange'
import Button from '../../general/Button'

const WarningChangeWarehouse = (props) => {

    const clickHandel = (event) => {
        if (
            !event.composedPath().map((el) => el.id).includes('changeWarehouseMessage') &&
            !event.composedPath().map((el) => el.id).includes('selectFromListWarehousesWR')
        ) {
            props.setMessageWarning(false)
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleChange = () => {
         const parts = props.registration.parts.map(part => {
            const rule = part.part.residue_rules.find(rule => rule.warehouse.id === props.warehouse.id)
            if (rule) {
                part.cell = rule.cell
                return part
            } else {
                part.cell = null
                return part
            }

        })
        props.changeRegistrationState({warehouse: props.warehouse, parts})
        props.setMessageWarning(false)
    }


    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix wmn500' id='changeWarehouseMessage'>
                <div className='createNewTitle'>Вы уверены, что хотите изменить склад?</div>
                <div className='mt15'>
                    <WarningOrange text='Если вы измените склад, то места хранения всех добавленых позиций изменятся'/>
                </div>
                <div className='row mt15 w100 jc-c'>
                    <Button
                        className='blueButton'
                        title='Изменить'
                        onClick={handleChange}
                    />
                    <Button
                        className='whiteBlueBotton ml15'
                        title='Отмена'
                        onClick={() => props.setMessageWarning(false)}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    registration: state.registration
})

const mapDispatchToProps = {
    changeRegistrationState
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningChangeWarehouse)