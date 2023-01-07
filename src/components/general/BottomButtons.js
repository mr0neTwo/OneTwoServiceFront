import React from 'react'

import {ICON} from '../../data/icons'

/**
 * Кнопки сниза панели редактора
 *
 * edit={props.edit} // Новый заказ или редактируем существующий
 *
 * deleted={props.deleted} // Удален ли заказ
 *
 * create={() => console.log('create')} // Функция создания нового
 *
 * save={() => console.log('save')} // Функция сохранения уже существующего
 *
 * delete={() => console.log('delete')} // Функция удаления
 *
 * recover={() => console.log('recover')} // Фунция восстановления
 *
 * close={() => console.log('close')} // Функция закрытия редактора
 * 
 * extraButton={() => console.log('extra')} // Функция дополнительной кнопки
 * 
 * extraTitle='extraTitle' // Текст дополнительно кнопки
 *
 */
const BottomButtons = (props) => {
    const buttonCreate = props.create ? (
        <div className="blueButton mr-lf-0 " onClick={props.create}>
            Создать
        </div>
    ) : null

    const buttonSave = props.save ? (
        <div className="blueButton mr-lf-0" onClick={props.save}>
            Сохранить
        </div>
    ) : null

    const buttonClose = props.close ? (
        <div className="whiteBlueBotton" onClick={props.close}>
            Закрыть
        </div>
    ) : null

    const buttonDelete = props.delete ? (
        <div id='deleteButton' className="whiteButton simbolBotton" onClick={props.delete}>
            <svg className="icon-table-red-basket" viewBox="0 0 32 32">
                <path d={ICON.TRASH}/>
            </svg>
        </div>
    ) : null

    const buttonRecover = props.recover ? (
        <div
            className={`${props.recover ? 'blueButton' : 'greyDisbledButton'} mr-lf-0`}
            onClick={props.recover}
        >
            <svg className="icon-recover" viewBox="0 0 32 32">
                <path d={ICON.SPINNER}/>
            </svg>
            Восстановить
        </div>
    ) : null

    const extraButton = props.extraButton ? (
        <div id='extraButton' className="whiteButton mr5" onClick={props.extraButton}>
            {props.extraTitle}
        </div>
    ) : null

    return (
        <div className="buttons_ mt15">
            <div className="buttons">
                {props.edit ? (props.deleted ? buttonRecover : buttonSave) : buttonCreate}
                {buttonClose}
            </div>
            {extraButton}
            {props.edit && !props.deleted ? buttonDelete : null}
        </div>
    )
}

export default BottomButtons

// edit={props.edit}
// deleted={props.deleted}
// create={() => console.log('create')}
// save={() => console.log('save')}
// delete={() => console.log('delete')}
// recover={() => console.log('recover')}
// close={() => console.log('close')}
