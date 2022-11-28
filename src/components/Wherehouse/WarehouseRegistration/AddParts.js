import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import Icon from '../../general/Icon'

import {addParts, changePartState} from '../../../Redux/actions/partAction'
import {icon_down, icon_left} from '../../../data/icons'
import {changeRegistrationState} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'
import Button from '../../general/Button'
import {useHistory} from 'react-router-dom'
import {includesObject} from '../../general/utils'



const AddParts = (props) => {

    const history = useHistory()

    useEffect(() => {
        props.addParts()
    }, [props.part.filter_name])

    const [showList, setShowList] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.path.map(el => el.id).includes('listWarehousePart') &&
            !event.path.map(el => el.id).includes('warehousePart') &&
            !event.path.map(el => el.id).includes('registrationPartEditor')
        ) {
            setShowList(false)
        }
    }
    
    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleSet = (part) => {
        setShowList(false)
        let cell = ''
        if (Object.values(props.registration.warehouse).length) {
            const rule = part.residue_rules.find(rule => rule.warehouse.id === props.registration.warehouse.id)
            cell = rule ? rule.cell : ''
        }
        props.changeRegistrationState({part, cell, prices: part.prices})
        props.changeVisibleState({
            statusRegistrationPartEditor: true,
            inputRegistrationPartChecked: true
        })
    }

    const parts = props.part.parts.filter(part => !props.registration.parts.map(part => part.part.id).includes(part.id))

    return (
        <div className='w400 h52'>

            <div className='lableImput mt15'>Наименование товара</div>

            <div className='blockInput'>
                <div
                    id='warehousePart'
                    className='orderInputBox'
                    style={{borderColor: props.view.inputRegistrationPartChecked  ?  null : 'red'}}
                    onClick={props.registration.edit ? null : () => setShowList(true)}
                >
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changePartState({filter_name: event.target.value})}
                        disabled={props.registration.edit}
                    />
                    <Icon
                        className='icon-s4'
                        icon={showList ? icon_left : icon_down}
                    />
                </div>
                {showList ?
                    <div className='listFilter' id='listWarehousePart'>
                        {parts.map(part => (
                            <div
                                className='rowGropList'
                                key={part.id}
                                onClick={() => handleSet(part)}
                            >
                                <div>{(part.marking !== part.title) && !!part.marking ? `${part.title } (${part.marking})`: part.title}</div>
                                <div className='orderDate ml30 noWr'>
                                    {part.description}
                                </div>
                            </div>
                        ))}
                        <div className='btmst'>
                            <Button
                                title='+ Запчасть'
                                className='whiteButton'
                                onClick={() => props.changeVisibleState({statusPartEditor: true})}
                            />
                        </div>
                    </div> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    view: state.view,
    registration: state.registration
})

const mapDispatchToProps = {
    changePartState,
    addParts,
    changeRegistrationState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddParts)