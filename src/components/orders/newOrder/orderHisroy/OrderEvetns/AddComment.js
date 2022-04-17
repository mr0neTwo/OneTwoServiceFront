import React, {useLayoutEffect} from 'react'
import {connect} from 'react-redux'

import {changeOrderState, addEventComment} from '../../../../../Redux/actions/orderActions'

const AddComment = props => {

    const handlePressKey = event => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault()
            props.changeOrderState({event_comment: event.target.value + '\n'})
            return
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            props.addEventComment()
            return
        }
    }


    const MIN_TEXTAREA_HEIGHT = 16
    const textareaRef = React.useRef(null);

    useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = '16px'
        // Set height
        textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight - 10, MIN_TEXTAREA_HEIGHT)}px`
    }, [props.order.event_comment])

    return (
        <div className='mt15'>
            <div className='orderCommentBox'>
                <textarea
                    ref={textareaRef}
                    style={{
                       minHeight: MIN_TEXTAREA_HEIGHT,
                       resize: "none"
                    }}
                    className='commentInput'
                    onChange={event => props.changeOrderState({event_comment: event.target.value})}
                    value={props.order.event_comment}
                    onKeyPress={handlePressKey}
                    placeholder="Введите текст комментария"
                />
            </div>
            <p className='m0 ml15 mt5'><b>Enter</b>, чтобы отправить</p>
            <p className='m0 ml15'><b>Shift + Enter</b>, чтобы добавить еще одну строчку</p>
        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

const mapDispatchToProps = {
    changeOrderState,
    addEventComment
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)