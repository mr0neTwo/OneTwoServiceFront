import React from 'react'
import {connect} from 'react-redux'

import {changeClientState} from '../../../Redux/actions/clientAction'
import ChooseButton from '../../general/ChooseButton'
import Checkbox from '../../general/Checkbox'
import Icon from '../../general/Icon'
import {icon_angry, icon_truck} from '../../../data/icons'


const TopCheckboxes = (props) => {
    return (
        <div className="buttons mt15">
            <ChooseButton
                name={['Физ. лицо', 'Компания']}
                func1={() => props.changeClientState({juridical: false})}
                func2={() => props.changeClientState({juridical: true})}
                checked={true}
                disabled={false}
                invisible={false}
            />
            <Checkbox
                className='ml10'
                label='Поставщик'
                onChange={event => props.changeClientState({supplier: event.target.checked})}
                checked={props.client.supplier}
                iconClassName='icon-s1'
                icon={icon_truck}
            />
            <Checkbox
                className='ml10'
                label='Конфликтный'
                onChange={event => props.changeClientState({conflicted: event.target.checked})}
                checked={props.client.conflicted}
                iconClassName='icon-s1'
                icon={icon_angry}
                iconColor='#f74e4d'
            />
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
