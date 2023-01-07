import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import {createEquipmentModel, addEquipmentModel, changeBookState} from '../../../../Redux/actions/bookActions'
import {ICON} from '../../../../data/icons'
import Icon from '../../../general/Icon'
import {changeOrderState} from '../../../../Redux/actions/orderActions'

const SetOrderModel = (props) => {

    const [visibleList, setVisibleList] = useState(false)
    const [visibleBotton, setVisisbleBotton] = useState(false)

    useEffect(() => {
        if (Object.values(props.book.equipment_subtype).length) props.addEquipmentModel()
    }, [props.book.equipment_subtype, props.book.filter_model])


    const disabled = !Object.values(props.book.equipment_subtype).length
    const seted = !!Object.values(props.order.model).length

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

    const setModel = model => {
        props.changeOrderState({model})
        props.changeBookState({equipment_model: model, filter_model: ''})
        setVisibleList(false)
        setVisisbleBotton(false)
    }

    const reset = () => {
        props.changeOrderState({model: {}})
        props.changeBookState({equipment_model: {}})
    }

    return (
        <div>
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
                    value={seted ? props.order.model.title : props.book.filter_model}
                    disabled={disabled || seted}
                />
                {seted && props.permissions.includes('edit_info_orders') ?
                    <div onClick={reset}>
                        <Icon icon={ICON.CANCEL} className='icon-close'/>
                    </div>
                    :
                    <Icon icon={ICON.DOWN} className='icon-s2'/>
                }
            </button>
            {visibleList && !disabled ? (
                <div className="listFilter" id="listOrderOfModel">
                    {props.book.equipment_models.map((model) => (
                        visibleBotton ? null :
                        <div
                            key={model.id}
                            className="rowGropList"
                            onClick={() => setModel(model)}
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
                                        props.createEquipmentModel(event.target.value)
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    order: state.order,
    book: state.book,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    createEquipmentModel,
    changeOrderState,
    addEquipmentModel,
    changeBookState
}

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderModel)
