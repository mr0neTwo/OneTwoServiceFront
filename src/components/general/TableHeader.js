import React, {useState} from 'react'
import { connect } from 'react-redux'
import {changeDataState} from '../../Redux/actions/dataAction'
import Icon from './Icon'
import {ICON} from '../../data/icons'


/**
 * Заголовок таблицы (ячейка)
 * @component
 * @example
 * <TableHeader
 * header={header}
 * headers={props.headers}
 * changeState={state_object => console.log(state_object)}
 * field='table_headers'
 * title_field_sort='sort_field'
 * title_sort='sort'
 * title_sort_field={props.sort_field}
 * sort={props.sort}
 * />
 *
 * header - oбъект заголовка
 * headers - список всех выбранных заголовков
 * changeState - функция изменения state текущего редюсера
 * field - поле выбранных заголовков таблицы default='table_headers'
 * title_field_sort - поле типа сортировки
 * title_sort - поле типп сортировки
 * title_sort_field - значение поля сортировки default='sort_field'
 * sort - значение типа сортировки
 *
 */


const TableHeader = (props) => {

    const [columnWidth, setColumnWidth] = useState(props.header.width)

    const mouseMove = (event) => {
        const deltaDrag = event.pageX - props.data.position_cursor
        if (deltaDrag) setColumnWidth(columnWidth + deltaDrag)
    }

    const mouseUp = (event) => {
        // вычисляем рассторяние перемещение курсора
        const deltaDrag = event.pageX - props.data.position_cursor
        // Установливаем новое значение в текущий state
        setColumnWidth(columnWidth + deltaDrag)
        // Менем значение в массиве заголовков
        const headers = props.headers.map(header => {
            if (header.id === props.header.id) {
                header.width = columnWidth + deltaDrag
                return header
            } else {
                return header
            }
        })
        // записываем новый массив в state
        props.changeState({[props.field || 'table_headers']: headers})
        window.removeEventListener('mousemove', mouseMove)
        window.removeEventListener('mouseup', mouseUp)
    }

    const handleDragStart = event => {
        props.changeDataState({position_cursor: event.pageX})
        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const handleEndDrag = () => {
        // меняем позицию текущего поля
        let headers = props.headers.map(header => {
            if (header.id === props.header.id) {
                header.order = props.data.position_over + 0.5
                return header
            } else {
                return header
            }
        })
        // сортируем
        headers = headers.sort( (a, b) => a.order - b.order)
        // обновляем индексы
        headers = headers.map((field, idx) => {
            field.order = idx
            return field
        })
        // записываем новый массив в state
        props.changeState({[props.field || 'table_headers']: headers})
        props.changeDataState({position_over: null})
    }
    const handleDragOver = (order_position) => {
        if (props.data.position_over !== order_position) {
            props.changeDataState({position_over: order_position})
        }
    }

    return (
        <th style={{maxWidth: `${columnWidth}px`}} >
            <div className='table-header-container'  >
                <div
                    className='nowrap'
                    draggable
                    onClick={!props.changeState ? null : () => props.changeState({
                        [props.title_sort_field || 'sort_field']: props.header.field,
                        [props.title_sort || 'sort']: props.sort === 'asc' ? 'desc' : 'asc'
                    })}
                    onDragEnd={props.headers ? handleEndDrag : null}
                >
                    <span>{props.header.title}</span>
                    <span>
                        {props.sort_field === props.header.field ? (props.sort === 'asc' ? '↓' : '↑') : null}
                    </span>
                </div>
                {props.headers ?
                    <div className='row'>
                        <div
                            className='cur-resize'
                            onMouseDown={handleDragStart}
                        >
                            <Icon
                                icon={ICON.RESIZE}
                                className='icon-16'
                            />
                        </div>
                        <div
                            style={{display: props.data.position_over === props.header.order ? 'block' : 'none'}}
                            className='dragOver'
                        />
                        <div
                            className='overArea'
                            onDragOver={() => handleDragOver(props.header.order)}
                        />
                    </div>: null}

            </div>

        </th>
    )
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = {
    changeDataState
}

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader)