import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import Icon from '../../general/Icon'

import {addParts, changePartState} from '../../../Redux/actions/partAction'
import {icon_down, icon_left} from '../../../data/icons'
import {changeRegistrationState} from '../../../Redux/actions/registrationAction'
import {changeVisibleState} from '../../../Redux/actions'



const AddParts = (props) => {

    useEffect(() => {
        console.log(props.part.filter_name)
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


    return (
        <div className='w400 h52'>

            <div className='lableImput mt15'>Наименование товара</div>

            <div className='blockImput'>
                <div
                    id='warehousePart'
                    className='orderInputBox'
                    onClick={() => setShowList(true)}
                >
                    <input
                        className='optionFilterInput'
                        onChange={event => props.changePartState({filter_name: event.target.value})}
                    />
                    <Icon
                        className='icon-s4'
                        icon={showList ? icon_left : icon_down}
                    />
                </div>

                {showList ?
                    <div className='listFilter' id='listWarehousePart'>
                        {props.part.parts.map(part => (
                            <div
                                className='rowGropList'
                                key={part.id}
                                onClick={() => {
                                    setShowList(false)
                                    // props.addRegistrationPart(part)
                                    props.changeRegistrationState({part})
                                    props.changeVisibleState({statusRegistrationPartEditor: true})
                                }}
                            >
                                <div>{part.marking !== part.title ? `${part.title } (${part.marking})`: part.title}</div>
                                <div className='orderDate ml30 noWr'>
                                    {part.description}
                                </div>
                            </div>
                        ))}
                    </div> : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    view: state.view
})

const mapDispatchToProps = {
    changePartState,
    addParts,
    changeRegistrationState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddParts)