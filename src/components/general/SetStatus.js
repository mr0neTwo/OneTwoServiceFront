import React, {useEffect, useRef, useState} from 'react'
import {COLORS} from '../../data/colors'


/**
 * Кнопка смены статуса
 *
 * @component
 * @example
 * <SetStatus
 * id={id}
 * status={status}
 * listOfGroups={list}
 * changeStatus = {props.changeStatus(status => props.changeStatus(status.id, objectId) )}
 * />
 *
 * id - id элемента
 * status - текущий статус
 * listOfGroup - группы статусов для выбора
 * changeStatus - функция выбора статуса
 */
const SetStatus = props => {

    const [listVisible, setVisibleList] = useState(false)
    const [height, setHeight] = useState(500)
    const [isTop, setIsTop] = useState(false)

    const statusRef = useRef(null)

    const clickHandel = event => {
        if (event.composedPath() && !event.composedPath().map(el => el.id).includes(`status_${props.id}`)) {
            if (listVisible) {
                setVisibleList(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleSetStatus = (status) => {
        props.changeStatus(status)
        setVisibleList(false)
    }

    const handleClick = () => {
        setVisibleList(!listVisible)
        if (props.tableOrderRef) {
            const topTable = props.tableOrderRef.current.offsetTop
            const bottomTable =  topTable + props.tableOrderRef.current.offsetHeight
            const distanceToTop = statusRef.current.offsetTop - 5
            const bottomStatus = statusRef.current.offsetTop + 36
            const distanceToBottom = bottomTable - bottomStatus - topTable

            if (distanceToBottom < distanceToTop) {
                setHeight(distanceToTop)
                setIsTop(true)
            } else {
                setHeight(distanceToBottom)
            }
        }
    }



    return (
        <div
            id={`status_${props.id}`}
            ref={statusRef}
            className="status-container"
            style={{overflow: listVisible ? 'visible': 'hidden'}}
        >
            <Status
                status={props.status}
                onClick={event => handleClick(event)}
            />

            {listVisible ?
                <div
                    className={`drop-list-statuses ${isTop ? 'drop-list-statuses-top' : ''}`}
                    style={{maxHeight: `${height}px`}}
                >
                    {props.listOfGroups.filter(group => group.statuses.length).map(group => (
                        <div key={group.id} className='colm g3'>
                            <div>{group.name}</div>
                            {group.statuses.map(status => (
                                    <Status
                                        key={status.id}
                                        status={status}
                                        onClick={() => handleSetStatus(status)}
                                    />
                                )
                            )}
                        </div>
                    ))}
                </div> : null}

        </div>
    )
}

const Status = props => {

    const [hover, setHover] = useState(false)



    return (
        <div
            className="status fw-bold nowrap"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            style={{
                backgroundColor: `var(--${COLORS.STATUS[props.status.group]}${hover ? '-lighten' : ''})`,
                color: COLORS.STATUS[props.status.group] === 'disabled' ? 'var(--secondary)' : 'var(--background)'
            }}
            onClick={event => props.onClick(event)}
        >
            {props.status.name}
        </div>
    )
}

export default SetStatus