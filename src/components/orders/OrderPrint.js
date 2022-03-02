import React, {useRef, useState} from 'react'
import {connect} from 'react-redux'
import ReactToPrint, {useReactToPrint} from 'react-to-print'

import Icon from '../general/Icon'
import {icon_down, icon_print} from '../../data/icons'
import Sticker from './Sticker'
import Button from '../general/Button'
import Checkbox from '../general/Checkbox'
import StikerToPrint from './StikerToPrint'
import {setVisibleFlag} from '../../Redux/actions'

const OrderPrint = (props) => {

    const [listVisible, setListVisible] = useState(false)
    const [chekOrderSticker, setChekOrderSticker] = useState(false)

    const handlePrint = () => {
        props.setVisibleFlag('statusOrderSticker', chekOrderSticker)
        setListVisible(false)
    }

    const afterPrint = () => {


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
                        onChange={event => setChekOrderSticker(event.target.checked)}
                        checked={chekOrderSticker}
                    />
                    <Button
                        className='blueButton ml30'
                        title='Печать'
                        onClick={handlePrint}
                    />
                </div>
                : null
            }


        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

const mapDispatchToProps = {
    setVisibleFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPrint)