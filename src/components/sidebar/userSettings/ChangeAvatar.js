import React, {useEffect, useMemo, useRef, useState} from 'react'
import { connect } from 'react-redux'
import Compress from 'react-image-file-resizer'

import {changeEmployeeState, saveAvatar} from '../../../Redux/actions/employeeAction'

import Button from '../../general/Button'
import RangeSlider from './RangeSlider'

const ChangeAvatar = (props) => {

    const [avaPosition, setAvaPosition] = useState([0, 0])
    const [originalSize, setOriginalSize] = useState()
    const img = useRef(null)

    const mouseMove = event => {
        const start = props.employee.avaStartPosition
        const deltaX = event.pageX - start[0]
        const deltaY = event.pageY - start[1]
        setAvaPosition([avaPosition[0] + deltaX, avaPosition[1] + deltaY])
    }

    const mouseUp = () => {
        window.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseUp)
    }

    const fileHandlerResize = file => {
        if (file) {
            Compress.imageFileResizer(
                file,
                1000,
                1000,
                "JPEG",
                100,
                0,
                (uri) => {
                    props.changeEmployeeState({img: uri})
                },
                "base64" // blob or base64 default base64
            )
        }
    }

    const fileHandler = event => {
        if (event.target.files[0]) {
            img.current.style.width = 'initial'
            clear()
            let reader = new FileReader()
            reader.onload = function (e) {
                props.changeEmployeeState({img: e.target.result})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }


    const handleDragStart = event => {
        if (props.employee.img) {
            props.changeEmployeeState({avaStartPosition: [event.pageX, event.pageY]})
            window.addEventListener('mousemove', mouseMove)
            window.addEventListener('mouseup', mouseUp)
        }
    }

    const handleScale = (scale) => {
        const positionX = avaPosition[0] * scale / 100
        const positionY = avaPosition[1] * scale / 100
        setAvaPosition([positionX, positionY])

    }

    useEffect(() => {
        if (img.current && img.current.clientWidth) {
            setOriginalSize(img.current.clientWidth)
        }
    }, [props.employee.img])

    useEffect(() => {
        if (originalSize) {
            img.current.style.width = `${props.employee.scale_img / 100 * originalSize}px`
        }
    }, [props.employee.scale_img])

    const clear = () => {
        props.changeEmployeeState({img: '', avatar: ''})
        setAvaPosition([0, 0])
        props.changeEmployeeState({scale_img: 100})
    }

    const save = () => {
        if (props.employee.img) {
            props.saveAvatar({
                avaPosition,
                size: [img.current ? img.current.clientWidth: 0, img.current ? img.current.clientHeight: 0]
            })
        }
    }

    return (

        <div className={`${props.className} change-avatar`}>

            <div>
                <div className='label'>Изменить аватар</div>
                <div className='cs'>{`Size: ${img.current ? img.current.clientWidth: 0}x${img.current ? img.current.clientHeight: 0}`}</div>
            </div>

            <div className='change-avatar__border'>
                <div className='change-avatar__mask'
                     draggable={false}
                     onMouseDown={handleDragStart}

                />
                <img
                    style={{
                        left: avaPosition[0],
                        top: avaPosition[1],
                    }}
                    onMouseDown={handleDragStart}
                    src={props.employee.img || `${process.env.REACT_APP_LOCAL_SOURCE}/${props.employee.avatar}`}
                    ref={img}
                    className='change-avatar__image'
                    alt='image'
                />
            </div>

            <RangeSlider
                className='mt15'
                onChange={scale =>  props.changeEmployeeState({scale_img: scale})}
                value={props.employee.scale_img}
                disabled={!props.employee.img }
            />

            <div className='two-buttons'>

                <label className="bt bt_med bt_create"> Загрузить
                    <input
                        className=''
                        type='file'
                        accept=".jpg,.jpeg"
                        onChange={fileHandler}
                        disabled={props.disabled}
                    />
                </label>
                <Button
                    size='med'
                    type='destructive'
                    title='Очистить'
                    onClick={clear}
                />
                <Button
                    size='med'
                    type='primary'
                    title='Сохранить'
                    onClick={save}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    employee: state.employee
})

const mapDispatchToProps = {
    changeEmployeeState,
    saveAvatar
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatar)