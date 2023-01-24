import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import {changeNotTemplateForm, createNotTemplate, resetNotTemplate} from '../../../../Redux/actions/notTemplateAction'
import {saveNotTemplate, deleteNotTemplate} from '../../../../Redux/actions/notTemplateAction'

import {listVarAnother, listVarClient, listVarCompany, listVarDate} from '../../../../data/varNames'
import {listVarEmployee, listVarFinance, listVarOrder} from '../../../../data/varNames'

import LableInput from '../../../general/LableInput'
import BottomButtons from '../../../general/BottomButtons'
import LableArea from '../../../general/LableArea'
import BoxVariable from './BoxVariable'

const NotTemplateEditor = props => {

    const handleClose = () => {
        props.setVisibleFlag('statusNotTemplateEditor', false)
        props.setVisibleFlag('inputNotTempTitleChecked', true)
        props.setVisibleFlag('inputNotTempTempleChecked', true)
        props.resetNotTemplate()
    }

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes('NotTempEditorWindow')) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.notTemplate.title && props.notTemplate.template) {
            props.createNotTemplate()
        } else {
            if(!props.notTemplate.title) props.setVisibleFlag('inputNotTempTitleChecked', false)
            if(!props.notTemplate.template) props.setVisibleFlag('inputNotTempTempleChecked', false)
        }
    }

    const handleSave = () => {
        if (props.notTemplate.title && props.notTemplate.template) {
            props.saveNotTemplate()
        } else {
            if(!props.notTemplate.title) props.setVisibleFlag('inputNotTempTitleChecked', false)
            if(!props.notTemplate.template) props.setVisibleFlag('inputNotTempTempleChecked', false)
        }
    }

    const can_deleted = props.permissions.includes('setting_delete_not_template')
    const can_recover = props.permissions.includes('setting_recover_not_template')

    return (
        <div className="rightBlock">
            <div className="rightBlockWindow" id="NotTempEditorWindow">
                <div className="createNewTitle">{props.notTemplate.edit ? props.notTemplate.title : 'Новый Шаблон'}</div>

                <div className="contentEditor">
                    <div className='row al-itm-bl'>
                        <div>
                        <LableInput
                            className="w250 mt15"
                            title="Название"
                            onChange={event => props.changeNotTemplateForm(event.target.value, 'title')}
                            value={props.notTemplate.title}
                            checkedFlag="inputNotTempTitleChecked"
                            checked={props.inputNotTempTitleChecked}
                            redStar={ true }
                            disabled={props.notTemplate.deleted}
                        />
                        <LableArea
                            className='w400 mt15'
                            title='Текст'
                            onChange={event => props.changeNotTemplateForm(event.target.value, 'template')}
                            value={props.notTemplate.template}
                            checkedFlag='inputNotTempTempleChecked'
                            checked={props.inputNotTempTempleChecked}
                            redStar={true}
                            disabled={props.notTemplate.deleted}
                        />
                        </div>
                        <div className='ml30'>
                            <h3>Переменные</h3>
                            <BoxVariable
                                title='Компания'
                                list_var={listVarCompany}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                            <BoxVariable
                                title='Клиент'
                                list_var={listVarClient}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                            <BoxVariable
                                title='Заказ'
                                list_var={listVarOrder}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                            <BoxVariable
                                title='Сотрудник'
                                list_var={listVarEmployee}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                            <BoxVariable
                                title='Финансы'
                                list_var={listVarFinance}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                            <BoxVariable
                                title='Дата'
                                list_var={listVarDate}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                            <BoxVariable
                                title='Прочие'
                                list_var={listVarAnother}
                                func={vr => props.changeNotTemplateForm(props.notTemplate.template + vr, 'template')}
                            />
                        </div>
                    </div>
                </div>


                <BottomButtons
                    edit={props.notTemplate.edit}
                    deleted={props.notTemplate.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={can_deleted ? () => props.deleteNotTemplate(true) : null}
                    recover={can_recover ? () => props.deleteNotTemplate(false) : null}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    notTemplate: state.notTemplate,
    inputNotTempTitleChecked: state.view.inputNotTempTitleChecked,
    inputNotTempTempleChecked: state.view.inputNotTempTempleChecked,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeNotTemplateForm,
    resetNotTemplate,
    createNotTemplate,
    saveNotTemplate,
    deleteNotTemplate
}

export default connect(mapStateToProps, mapDispatchToProps)(NotTemplateEditor)
