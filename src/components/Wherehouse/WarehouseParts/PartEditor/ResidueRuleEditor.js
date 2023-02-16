import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {changePartState, createResidueRule, deleteResidueRule} from '../../../../Redux/actions/partAction'
import {resetResidueRule, saveResidueRule} from '../../../../Redux/actions/partAction'

import BottomButtons from '../../../general/BottomButtons'
import SelectFromList from '../../../general/SelectFromList'
import LableInput from '../../../general/LableInput'


const ResidueRuleEditor = (props) => {

    const componentId = 'ResidueRuleEditor'

    const handleClose = () => {
        props.changeVisibleState({
            isCentralModalOpen: false,
            modalCentralType: '',
            inputResRulWarehouse: true
        })
        props.resetResidueRule()
    }

    const clickHandel = (event) => {
        if (!event.composedPath().map((el) => el.id).includes(componentId)) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const check = !props.part.edit_residue_rules && props.part.residue_rules.some(rule => rule.warehouse.id === props.part.warehouse.id && (rule.min_residue || rule.necessary_amount))

    const handleCreate = () => {
        if (Object.values(props.part.warehouse).length && !check) {
            props.createResidueRule()
        } else {
            props.changeVisibleState({inputResRulWarehouse: false})
        }
    }

    const handleSave = (idx) => {
        if (Object.values(props.part.warehouse).length && !check) {
            props.saveResidueRule()
        } else {
            props.changeVisibleState({inputResRulWarehouse: false})
        }
    }

    const handleDelete = () => {
        props.deleteResidueRule()
    }


    return (
        <div className='modal__box_editor' id={componentId}>
            <div className='modal__block-forms w220'>
                <h3>Привило</h3>
                <p>При достижении количества ниже минимального остатка, товар добавится в отчет "Товары, требующие
                    закупки" в количестве до максимального остатка</p>

                <SelectFromList
                    title='Склад'
                    list={props.warehouses}
                    setElement={warehouse => props.changePartState({warehouse})}
                    current_object={props.part.warehouse}
                    checkedFlag='inputResRulWarehouse'
                    noChoosed='Выберете склад'
                    disabled={!!props.part.edit_residue_rules}
                />
                {check ? <div className='login__error-message'>Для этого склада уже существует правило</div> : null}
                <LableInput
                    title='Минимальный остаток'
                    onChange={event => props.changePartState({min_residue: event.target.value.replace(/[^0-9]/g, '')})}
                    value={props.part.min_residue}
                />
                <LableInput
                    title='Необходимое количесто'
                    onChange={event => props.changePartState({necessary_amount: event.target.value.replace(/[^0-9]/g, '')})}
                    value={props.part.necessary_amount}
                />

                <BottomButtons
                    edit={props.part.edit_residue_rules}
                    create={handleCreate}
                    save={handleSave}
                    delete={handleDelete}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    warehouses: state.warehouse.warehouses
})

const mapDispatchToProps = {
    changePartState,
    changeVisibleState,
    resetResidueRule,
    createResidueRule,
    saveResidueRule,
    deleteResidueRule
}

export default connect(mapStateToProps, mapDispatchToProps)(ResidueRuleEditor)