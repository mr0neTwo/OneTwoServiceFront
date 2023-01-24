import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import Icon from '../../../general/Icon'
import {ICON} from '../../../../data/icons'
import Button from '../../../general/Button'
import Checkbox from '../../../general/Checkbox'
import {setVisibleFlag} from '../../../../Redux/actions'

const OrderPrint = (props) => {

    const [listVisible, setListVisible] = useState(false)

    const id = 'orderPrint'

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes(id) ) {
            if (listVisible) {
                setListVisible(false)
            }}
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handlePrint = () => {
        props.setVisibleFlag('statusOrderSticker', props.checkOrderSticker)
        setListVisible(false)
    }

    const handleCheckSticker = (event) => {
        props.setVisibleFlag('checkOrderSticker', event.target.checked)
        localStorage.setItem('checkOrderSticker', event.target.checked)
    }

    return (
        <div className='field-options' id={id}>
            <Button
                id={id + 'Button'}
                size='med'
                type='tertiary'
                onClick={() => setListVisible(!listVisible)}
                icon={ICON.PRINT}
            />
            {listVisible ?
                <div className='field-options__drop-list'>
                    <div
                        className='field-options__title'
                        onClick={() => setListVisible(false)}
                    >
                        <div className='nowrap'>Напечатать</div>
                        <Icon className='icon' icon={ICON.PRINT}/>
                    </div>
                    <div className='field-options__drop-items'>
                        <Checkbox
                            id={id + 'Checkbox'}
                            type='slide-one'
                            label='Приемная этикетка'
                            onChange={handleCheckSticker}
                            checked={props.checkOrderSticker}
                        />
                    </div>
                    <div className='field-options__buttons'>
                        <Button
                            size='med'
                            type='primary'
                            title='Печать'
                            onClick={handlePrint}
                            invisible={!props.order.edit}
                        />
                    </div>
                </div>
                : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order,
    checkOrderSticker: state.view.checkOrderSticker
})

const mapDispatchToProps = {
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPrint)