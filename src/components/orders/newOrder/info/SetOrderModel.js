import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {setOrderEquipment, resetEquipment, changeOrderFormS} from '../../../../Redux/actions'
import {createEquipmentModel, addEquipmentModel, changeBookState} from '../../../../Redux/actions/bookActions'
import {icon_cancel, icon_close, icon_down} from '../../../../data/icons'
import Icon from '../../../general/Icon'

const SetOrderModel = (props) => {

    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        if (Object.values(props.book.equipment_subtype).length) props.addEquipmentModel()
    }, [props.book.equipment_subtype, props.book.filter_model])

    const edit = props.order.edit

    const model = edit ? props.order.model : props.order.equipments[props.idx].model
    const disabled = !Object.values(props.book.equipment_subtype).length
    const seted = !!Object.values(model).length

    const clickHandel = (event) => {
        if (
            !event.path.map((el) => el.id).includes('listOrderOfModel') &&
            !event.path.map((el) => el.id).includes('optionsOrderTextOfModel')
        ) {
            if (visibleList) {
                setVisibleList(false)
                setVisisbleBotton(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const setModel = (idx, model) => {
        edit ? props.changeOrderFormS(model, 'model') : props.setOrderEquipment(idx, 'model', model)
        props.changeBookState({equipment_model: model, filter_model: ''})
        setVisibleList(false)
        setVisisbleBotton(false)
    }

    const reset = () => {
        edit ? props.changeOrderFormS({}, 'model') : props.resetEquipment(props.idx, 'model')
        props.changeBookState({equipment_model: {}})
    }

    return (
        <>
            <button
                className={disabled ? 'optionsUnavaliable' : 'optionsFilterText'}
                id="optionsOrderTextOfModel"
                onClick={() => setVisibleList(true)}
                disabled={disabled || seted}
            >
                <input
                    className={disabled ? 'optionsUnavaliable' : 'optionFilterInput'}
                    onChange={event => props.changeBookState({filter_model: event.target.value})}
                    placeholder="Выбирете модель"
                    value={seted ? model.title : props.book.filter_model}
                    disabled={disabled || seted}
                />
                {seted && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={icon_cancel} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={icon_down} className='icon-s2'/>
                }
            </button>
            {visibleList && !disabled ? (
                <div className="listFilter" id="listOrderOfModel">
                    {props.book.equipment_models.map((model) => (
                        visibleBotton ? null :
                        <div
                            key={model.id}
                            className="rowGropList"
                            onClick={() => setModel(props.idx, model)}
                        >
                            {model.title}
                        </div>
                    ))}
                    <div className="btmsts">
                        {visibleBotton ? (
                            <input
                                className="optionFilterInput"
                                autoFocus
                                onChange={event => props.changeBookState({filter_model: event.target.value})}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        props.createEquipmentModel(props.idx, event.target.value)
                                        setVisisbleBotton(false)
                                    }
                                }}
                                onBlur={() => setVisisbleBotton(false)}
                                value={props.book.filter_model}
                                placeholder="Введите и нажмиете Enter"
                            />
                        ) : (
                            <div
                                className="btnstsTitle"
                                onClick={() => setVisisbleBotton(true)}
                            >
                                Добавить модель
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    book: state.book,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    createEquipmentModel,
    setOrderEquipment,
    resetEquipment,
    changeOrderFormS,
    addEquipmentModel,
    changeBookState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderModel)
