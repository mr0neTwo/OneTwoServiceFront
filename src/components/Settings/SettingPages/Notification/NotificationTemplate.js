import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import {setVisibleFlag} from '../../../../Redux/actions'

import Button from '../../../general/Button'
import NotTemplateEditor from './NotTemplateEditor'
import TemplateTable from './TemplateTable'
import { changeNotTemplateForm} from '../../../../Redux/actions/notTemplateAction'
import Checkbox from '../../../general/Checkbox'

const NotificationTemplate = props => {



    return (
        <div className = 'contentTab'>
            <h3>Шаблоны</h3>
            <p>Создайте шаблон для оповещений или напоминаний.</p>
            <div className='row'>
                <Button
                    className='greenButton'
                    title='+ Шаблон'
                    onClick={() => props.setVisibleFlag('statusNotTemplateEditor', true)}
                    unvisible={props.permissions.includes('setting_create_notification')}
                />
                <Checkbox
                    className='ml10'
                    label='Показать удаленные'
                    onChange={event => props.changeNotTemplateForm(event.target.checked, 'showDeleted')}
                    checked={props.showDeleted}
                    unvisible={!props.permissions.includes('setting_see_deleted_not_template')}
                />
            </div>
            {props.statusNotTemplateEditor ? <NotTemplateEditor/> : null}
            <TemplateTable/>
        </div>
    )
}

const mapStateToProps = state => ({
    statusNotTemplateEditor: state.view.statusNotTemplateEditor,
    showDeleted: state.notTemplate.showDeleted,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    changeNotTemplateForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTemplate)