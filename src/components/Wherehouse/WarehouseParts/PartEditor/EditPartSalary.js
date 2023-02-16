import React, {useState} from 'react'
import { connect } from 'react-redux'

import WarningOrange from '../../../general/WarningOrange'
import Checkbox from '../../../general/Checkbox'
import LableInput from '../../../general/LableInput'
import {changePartState} from '../../../../Redux/actions/partAction'

const EditPartSalary = (props) => {

    const isEarning = Boolean(props.part.earnings_percent || props.part.earnings_percent)
    const [showOptions, setShowOptions] = useState(isEarning)

    const textWarning = 'Заполните эти поля, если хотите, чтобы за продажу товара из этой категории продавец ' +
        'получал нестандартное вознаграждение. В противном случае, оставьте эти поля пустыми, и при расчете ' +
        'ЗП будут учитываться общие правила расчета вознаграждения, заданные в карточке продавца'

    return (
        <div className='modal__block-forms'>
            <h5>Вознаграждение</h5>
            <WarningOrange text={textWarning}/>
            <Checkbox
                id='EditPartSalaryOption'
                type='slide-three'
                label='Добавить вознаграждение'
                onChange={() => setShowOptions(!showOptions)}
                checked={showOptions}
            />
            {showOptions ?
                <div className='two-buttons'>
                    <LableInput
                        title='Процент'
                        onChange={event => props.changePartState({earnings_percent: event.target.value})}
                        value={props.part.earnings_percent}
                        unit='%'
                    />
                    <LableInput
                        title='Сумма'
                        onChange={event => props.changePartState({earnings_sum: event.target.value})}
                        value={props.part.earnings_sum}
                        unit='руб'
                    />
                </div>
            : null}

        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {
    changePartState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPartSalary)