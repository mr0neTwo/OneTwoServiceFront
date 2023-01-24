import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {changeReqSparePartState} from '../../../Redux/actions/requestSparePartsAction'
import {addParts, changePartState} from '../../../Redux/actions/partAction'
import {icon_bug, icon_down, icon_left} from '../../../data/icons'
import {changeVisibleState} from '../../../Redux/actions'

import Icon from '../../general/Icon'
import Button from '../../general/Button'
import {checkObject} from '../../general/utils'



const SetPart = (props) => {

    useEffect(() => {
        props.addParts()
    }, [props.part.filter_name])

    const [showList, setShowList] = useState(false)

    const clickHandel = (event) => {
        if (
            !event.composedPath().map(el => el.id).includes('listPart') &&
            !event.composedPath().map(el => el.id).includes('spareParts')
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

    const handleNewPart = () => {
        props.changeVisibleState({statusPartEditor: true})
        props.changePartState({warehouse_category: props.warehouse.warehouse_categories})
    }

    if (checkObject(props.reqsp.part)) {
        return (
            <div className = 'mt15 w400'>
                <div className='partCard'>
                    <div>
                        <div>
                            <Icon
                                className='icon-client'
                                icon={icon_bug}
                            />
                            <span
                                className='partCardName'
                                onClick={() => console.log(props.reqsp.part)}
                            >
                                {props.reqsp.part.title}
                            </span>
                        </div>
                        <div className='noWr w350'>{props.reqsp.part.description}</div>
                        <div className='noWr w350'>
                            <span>Артукул: </span>
                            <span>{props.reqsp.part.article}</span>
                        </div>
                        <div className='noWr w350'>
                            <span>Код: </span>
                            <span>{props.reqsp.part.code}</span>
                        </div>
                    </div>
                    <div
                        className='crossButtom'
                        onClick={() => props.changeReqSparePartState({part: {}})}
                    >
                        &#9587;
                    </div>
                </div>
            </div>
        )
    }


    if (props.invisible) return <div/>

    return (
        <div id='spareParts' className='w400 h52'>

            <div className='lableImput mt15'>Наименование товара</div>

            <div className='blockInput'>
                <div
                    id='Parts'
                    className='orderInputBox'
                    style={{borderColor: props.view.inputRequestSparePart  ?  null : 'red'}}
                    onClick={props.reqsp.edit ? null : () => setShowList(true)}
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
                    <div className='listFilter' id='listPart'>
                        {props.part.parts.map(part => (
                            <div
                                className='rowGropList'
                                key={part.id}
                                onClick={() => props.changeReqSparePartState({part})}
                            >
                                <div>{(part.marking !== part.title) && !!part.marking ? `${part.title } (${part.marking})`: part.title}</div>
                                <div className='orderDate ml30 noWr'>
                                    {part.description}
                                </div>
                            </div>
                        ))}
                        <div className='btmst'>
                            <Button
                                id='btaddWP'
                                title='+ Запчасть'
                                className='whiteButton'
                                onClick={handleNewPart}
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
    reqsp: state.reqsp,
    warehouse: state.warehouse
})

const mapDispatchToProps = {
    changePartState,
    addParts,
    changeReqSparePartState,
    changeVisibleState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPart)