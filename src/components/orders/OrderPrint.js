import React, { useState} from 'react'
import {connect} from 'react-redux'

import Icon from '../general/Icon'
import {icon_down, icon_print} from '../../data/icons'
import Button from '../general/Button'
import Checkbox from '../general/Checkbox'
import {setVisibleFlag} from '../../Redux/actions'

const OrderPrint = (props) => {

    const [listVisible, setListVisible] = useState(false)

    const handlePrint = () => {
        props.setVisibleFlag('statusOrderSticker', props.checkOrderSticker)
        setListVisible(false)
    }

    const handleCheckSticker = (event) => {
        props.setVisibleFlag('checkOrderSticker', event.target.checked)
        localStorage.setItem('checkOrderSticker', event.target.checked)
    }

    return (
        <div className='blockImput mwmc'>
            <div
                className='row'
                onClick={() => setListVisible(!listVisible)}
            >
                <div className='whiteButton'>
                    <Icon icon={icon_print} className='icon-s4 pd1'/>
                    <Icon icon={icon_down} className='icon-s4 pd1'/>
                </div>
            </div>
            {listVisible ?
                <div className='listFilter'>
                    <Checkbox
                        label='Приемная этикетка'
                        onChange={handleCheckSticker}
                        checked={props.checkOrderSticker}
                    />
                    <Button
                        className='blueButton ml30'
                        title='Печать'
                        onClick={handlePrint}
                        unvisible={!props.order.edit}
                    />
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