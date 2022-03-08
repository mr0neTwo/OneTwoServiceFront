import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import {editNotTemplate} from '../../../../Redux/actions/notTemplateAction'

const TemplateTable = props => {

    const handleEdit = (template) => {
        if(props.permissions.includes('setting_edit_not_template')) {
            props.editNotTemplate(template)
            props.setVisibleFlag('statusNotTemplateEditor', true)
        }
    }

    return (
        <table>
            <thead>
            <tr>
                <th className='w150'>Название</th>
                <th>Шаблон</th>
            </tr>
            </thead>
            <tbody>
            {props.notTemplate.templates.map(template =>{
                return (
                    <tr
                        key={template.id}
                        className={template.deleted ? 'rowDeleted' : null}
                        onDoubleClick={() =>handleEdit(template)}
                    >
                        <td className='noWr'>{template.title}</td>
                        <td className='noWr'>{template.template}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    notTemplate: state.notTemplate,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    editNotTemplate
}


export default connect (mapStateToProps, mapDispatchToProps) (TemplateTable)