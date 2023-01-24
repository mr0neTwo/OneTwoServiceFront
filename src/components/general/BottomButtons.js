import React from 'react'

import {ICON} from '../../data/icons'
import Button from './Button'

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
            <Button
                id='bottomButtonsCreate'
                size='med'
                type='primary'
                title='Создать'
                onClick={props.create}
            />
        ) :
        null

    const buttonSave = props.save ? (
            <Button
                id='bottomButtonsSave'
                size='med'
                type='primary'
                title='Сохранить'
                onClick={props.save}
            />
    ) : null

    const buttonClose = props.close ? (
            <Button
                id='bottomButtonsClose'
                size='med'
                type='tertiary'
                title='Закрыть'
                onClick={props.close}
            />
    ) : null

    const buttonDelete = props.delete ? (
            <Button
                id='bottomButtonsDelete'
                size='med'
                type='destructive'
                icon={ICON.TRASH}
                onClick={props.delete}
            />
    ) : null

    const buttonRecover = props.recover ? (
            <Button
                id='bottomButtonsRecovery'
                size='med'
                type='primary'
                title='Восстановить'
                icon={ICON.SPINNER}
                onClick={props.recover}
            />
    ) : null

    const extraButton = props.extraButton ? (
            <Button
                id='bottomButtonsExtra'
                size='med'
                type='secondary'
                title={props.extraTitle}
                onClick={props.extraButton}
            />
    ) : null

    return (
        <div className="bottom-buttons">
            <div className="bottom-buttons__main-buttons">
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
