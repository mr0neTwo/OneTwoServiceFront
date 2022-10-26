import React, {useState} from 'react'
import { connect } from 'react-redux'
import WarningOrange from '../../../general/WarningOrange'
import Checkbox from '../../../general/Checkbox'
import LableInput from '../../../general/LableInput'
import {changePartState} from '../../../../Redux/actions/partAction'

const EditPartSalary = (props) => {

    return (
        <div className='mt15'>
            <h3>Вознаграждение</h3>
            <WarningOrange text='Заполните эти поля, если хотите, чтобы за продажу товара из этой категории продавец получал нестандартное вознаграждение. В противном случае, оставьте эти поля пустыми, и при расчете ЗП будут учитываться общие правила расчета вознаграждения, заданные в карточке продавца'/>
            <Checkbox
                className='mt15'
                label='Добавить вознаграждение'
                onChange={event => props.changePartState({visible_option: event.target.checked})}
                checked={props.part.visible_option}
            />
            {props.part.visible_option ?
                <div>
                    <LableInput
                        className='mt15'
                        width='150px'
                        title='Процент'
                        onChange={event => props.changePartState({earnings_percent: event.target.value})}
                        value={props.part.earnings_percent}
                        unit='%'
                    />
                    <LableInput
                        className='mt15'
                        width='150px'
                        title='Сумма'
                        onChange={event => props.changePartState({earnings_sum: event.target.value})}
                        value={props.part.earnings_sum}
                        unit='руб.'
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