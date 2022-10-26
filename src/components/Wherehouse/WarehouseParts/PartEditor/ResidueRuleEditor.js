import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {changeVisibleState} from '../../../../Redux/actions'
import {changePartState, createResidueRule, deleteResidueRule} from '../../../../Redux/actions/partAction'
import {resetResidueRule, saveResidueRule} from '../../../../Redux/actions/partAction'

import BottomButtons from '../../../general/BottomButtons'
import SelectFromList from '../../../general/SelectFromList'
import LableInput from '../../../general/LableInput'


const ResidueRuleEditor = (props) => {

    const handleClose = () => {
        props.changeVisibleState({
            statusResidueRuleEditor: false,
            inputResRulWarehouse: true
        })
        props.resetResidueRule()
    }

    const clickHandel = (event) => {
        if (!event.path.map((el) => el.id).includes('residueRuleEditor')) {
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
        <div className='centerBlockFix'>
            <div className='blockWindowFix w500' id='residueRuleEditor'>
                <div className='createNewTitle'>Привило</div>
                <p>При достижении количества ниже минимального остатка, товар добавится в отчет "Товары, требующие закупки" в количестве до максимального остатка</p>

                <SelectFromList
                    id='rule_residue_ware'
                    title='Склад'
                    className='mt15'
                    list={props.warehouses}
                    setElement={warehouse => props.changePartState({warehouse})}
                    current_object={props.part.warehouse}
                    width={'250px'}
                    checkedFlag='inputResRulWarehouse'
                    noChoosed='Выберете склад'
                    disabled={!!props.part.edit_residue_rules}
                />
                {check ? <div className='errorMassageInput mt5'>Для этого склада уже существует правило</div> : null}
                <LableInput
                    className='mt15'
                    width='50px'
                    title='Минимальный остаток'
                    onChange={event => props.changePartState({min_residue: event.target.value.replace(/[^0-9]/g, '')})}
                    value={props.part.min_residue}
                    unit=' '
                />
                <LableInput
                    className='mt15'
                    width='50px'
                    title='Необходимое количесто'
                    onChange={event => props.changePartState({necessary_amount: event.target.value.replace(/[^0-9]/g, '')})}
                    value={props.part.necessary_amount}
                    unit=' '
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