import React, {useEffect, useRef} from 'react'
import {connect} from 'react-redux'

import ReactToPrint, {useReactToPrint} from 'react-to-print'


import Sticker from './Sticker'

const StikerToPrint = props => {

    const stickerToPrintRef = useRef()



    const printOSticker = useReactToPrint({
        content: () => stickerToPrintRef.current,
        onAfterPrint: props.onAfterPrint
    })
    useEffect(() => {
        printOSticker()
    })


    return (
            <div
                style={{display: 'none'}}
            >
                <Sticker
                    ref={stickerToPrintRef}
                    order={props.order}
                />
            </div>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(StikerToPrint)