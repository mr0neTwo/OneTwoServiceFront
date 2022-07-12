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

        <div className={`${props.className} boxAvatar`}>
            <div className='lableImput'>Изменить аватар</div>
            <div>{`Size: ${img.current ? img.current.clientWidth: 0}x${img.current ? img.current.clientHeight: 0}`}</div>
            <div className='borderMask'>
                <div className='mask'
                     draggable={false}
                     onMouseDown={handleDragStart}
                />
                <img
                    style={{
                        left: avaPosition[0],
                        top: avaPosition[1],
                    }}
                    src={props.employee.img || `${process.env.REACT_APP_LOCAL_SOURCE}/${props.employee.avatar}`}
                    ref={img}
                    className='editAvaImg'
                />
            </div>

            <RangeSlider
                className='mt15'
                onChange={value => props.changeEmployeeState({scale_img: value})}
                value={props.employee.scale_img}
                disabled={!props.employee.img }
            />

            <div className='row mt15'>

                <label className="labelAva"> Загрузить
                    <input
                        className='addAva'
                        type='file'
                        accept=".jpg,.jpeg"
                        onChange={fileHandler}
                        disabled={props.disabled}
                    />
                </label>
                <Button
                    className='greenButton bcr ml15'
                    title='Очистить'
                    onClick={clear}
                />
                <Button
                    className='blueButton '
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