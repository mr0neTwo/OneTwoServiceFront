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
 * sort_field={props.sort_field}
 * sort={props.sort}
 * />
 *
 * header - oбъект заголовка
 * headers - список всех выбранных заголовков
 * changeState - функция изменения state текущего редюсера
 * field - поле выбранных заголовков таблицы default='table_headers'
 * title_field_sort - поле типа сортировки
 * title_sort - поле типп сортировки
 * sort_field - значение поля сортировки default='sort_field'
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

    const sortField = () => {
        if (props.changeState) {
            props.changeState({
                [props.title_sort_field || 'sort_field']: props.header.field,
                [props.title_sort || 'sort']: props.sort === 'asc' ? 'desc' : 'asc'
            })
        }
    }

    const getSortIcon = () => {
        if (props.sort_field === props.header.field) {
            if (props.sort === 'asc') {
                return <Icon className='icon' icon={ICON.SORT_ASC}/>
            } else {
                return <Icon className='icon' icon={ICON.SORT_DESC}/>
            }
        } else {
            return null
        }
    }

    return (
        <th style={{minWidth: `${columnWidth}px`}} >
            <div className='table-header' >
                <div
                    className='table-header__content'
                    draggable
                    onClick={sortField}
                    onDragEnd={props.headers ? handleEndDrag : null}
                >
                    <div className='table-header__title'>{props.header.title}</div>
                    <div>{getSortIcon()}</div>
                </div>
                {props.headers ?
                    <div className='row'>
                        <div
                            className='table-header__resize'
                            onMouseDown={handleDragStart}
                        >
                            <Icon
                                icon={ICON.RESIZE}
                                className='icon'
                            />
                        </div>
                        <div
                            style={{display: props.data.position_over === props.header.order ? 'block' : 'none'}}
                            className='table-header__dragOver'
                        />
                        <div
                            className='table-header__overArea'
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