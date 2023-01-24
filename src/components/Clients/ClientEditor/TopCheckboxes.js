import React from 'react'
import {connect} from 'react-redux'

import {changeClientState} from '../../../Redux/actions/clientAction'
import ChooseButton from '../../general/ChooseButton'
import Checkbox from '../../general/Checkbox'
import Icon from '../../general/Icon'
import {ICON} from '../../../data/icons'


const TopCheckboxes = (props) => {
    return (
        <div className="modal__block-forms_row">
            <div className='modal__block-forms w220'>
                <ChooseButton
                    name={['Физ. лицо', 'Компания']}
                    func1={() => props.changeClientState({juridical: false})}
                    func2={() => props.changeClientState({juridical: true})}
                    checked={true}
                    disabled={false}
                    invisible={false}
                />
            </div>
            <div className='modal__block-forms'>
                <Checkbox
                    id='ClientEditorSupplier'
                    type='slide-three'
                    label='Поставщик'
                    onChange={event => props.changeClientState({supplier: event.target.checked})}
                    checked={props.client.supplier}
                    iconClassName='icon'
                    icon={ICON.TRUCK}
                    // iconColor='var(--main)'
                />
                <Checkbox
                    id='ClientEditorConflicted'
                    type='slide-three'
                    label='Конфликтный'
                    onChange={event => props.changeClientState({conflicted: event.target.checked})}
                    checked={props.client.conflicted}
                    iconClassName='icon'
                    icon={ICON.ANGRY}
                    iconColor='var(--error)'
                />
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    client: state.client,
})

const mapDispatchToProps = {
    changeClientState,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopCheckboxes)
