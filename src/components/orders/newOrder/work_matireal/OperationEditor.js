import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../../../Redux/actions'
import { resetOperation, changeOperationForm, createCustomOperation } from '../../../../Redux/actions/operationActions'
import { saveOperation, deleteOperation } from '../../../../Redux/actions/operationActions'

import LableInput from '../../../general/LableInput'
import LableArea from '../../../general/LableArea'
import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseBotton from '../../../general/ChooseBotton'

const OperationEditor = (props) => {

   const handleClose = () => {
       props.resetOperation()
       props.setVisibleFlag('statusOperationEditor', false)
       props.setVisibleFlag('inputOperationTitleChacked', true)
       props.setVisibleFlag('inputOperationEngineerChacked', true)
   }
   
   const clickHandel = (event) => {
      if (!event.path.map((el) => el.id).includes('operationEditorWiondow')) {
         handleClose()
      }
   }

   useEffect(() => {
      window.addEventListener('click', clickHandel)
      return () => {
         window.removeEventListener('click', clickHandel)
      }
   })

   useEffect(() => {
      const discount = props.operation.percent ?  props.operation.price * props.operation.amount * props.operation.discount / 100 : props.operation.discount * props.operation.amount
      props.changeOperationForm(discount, 'discount_value')
   }, [props.operation.discount, props.operation.percent, props.operation.amount])

   useEffect(() => {
      props.changeOperationForm(props.operation.price * props.operation.amount - props.operation.discount_value , 'total')
   }, [props.operation.price, props.operation.discount_value, props.operation.amount])


  const handleCreate = () => {
    if (props.operation.title && props.operation.engineer_id) {
      props.createCustomOperation()
      handleClose()
    } else {
      if (!props.operation.title) props.setVisibleFlag('inputOperationTitleChacked', false)
      if (!props.operation.engineer_id) props.setVisibleFlag('inputOperationEngineerChacked', false)
    }
  }

  const handleSave = () => {
   if (props.operation.title && props.operation.engineer_id) {
      props.saveOperation()
      handleClose()
    } else {
      if (!props.operation.title) props.setVisibleFlag('inputOperationTitleChacked', false)
      if (!props.operation.engineer_id) props.setVisibleFlag('inputOperationEngineerChacked', false)
    }
 }

  return (
    <div className='rightBlock'>
      <div className='rightBlockWindow mwp' id='operationEditorWiondow'>
         <div className='createNewTitle fsz20'>{props.operation.edit ? props.operation.title : 'Новая операция'}</div>

         <div className='contentEditor'>
            <LableInput
               className='mt15'
               title='Наименование'
               onChange={event => props.changeOperationForm(event.target.value, 'title')}
               value={props.operation.title}
               checkedFlag='inputOperationTitleChacked'
               checked={props.view.inputOperationTitleChacked}
               disabled={props.operation.deleted}
               unvisible={props.operation.edit}
               redStar={true}
            />
            <LableInput
               className='w70 mt15'
               title='Цена'
               onChange={event => props.changeOperationForm(event.target.value.replace(/[^0-9.]/g, ''), 'price')}
               value={props.operation.price}
               unit='руб.'
               disabled={props.operation.deleted}
            />
            <LableInput
               className='w70 mt15'
               title='Количество'
               onChange={event => props.changeOperationForm(parseInt(event.target.value.replace(/[^0-9.]/g, '')), 'amount')}
               value={props.operation.amount}
               unit=' '
               disabled={props.operation.deleted}
            />
            <LableInput
               className='w70 mt15'
               title='Себестоимость'
               onChange={event => props.changeOperationForm(event.target.value.replace(/[^0-9.]/g, ''), 'cost')}
               value={props.operation.cost}
               unit='руб.'
               disabled={props.operation.deleted}
            />
            <div className='row al-itm-fe'>
               <LableInput
                  className='w70 mt15'
                  title='Скидка'
                  onChange={event => props.changeOperationForm(event.target.value.replace(/[^0-9]/g, ''), 'discount')}
                  value={props.operation.discount}
                  unit=' '
                  disabled={props.operation.deleted}
               />
               <ChooseBotton
                  className='ml30'
                  name={['руб.', '%']}
                  func1 = {() => props.changeOperationForm(false, 'percent')}
                  func2 = {() => props.changeOperationForm(true, 'percent')}
                  disabled={props.operation.deleted}
               />
            </div>
            <div className='row al-itm-fe'>
               <LableInput
                  className='w70 mt15'
                  title='Гарантия'
                  onChange={event => props.changeOperationForm(event.target.value.replace(/[^0-9]/g, '') * props.operation.warranty_value, 'warranty_period')}
                  value={parseInt(props.operation.warranty_period / props.operation.warranty_value)}
                  unit=' '
                  disabled={props.operation.deleted}
               />
               <ChooseBotton
                  className='ml30'
                  name={['Дни', 'Мес']}
                  func1 = {() => props.changeOperationForm(1*24*60*60, 'warranty_value')}
                  func2 = {() => props.changeOperationForm(30*24*60*60, 'warranty_value')}
                  disabled={props.operation.deleted}
               />
            </div>
            <ChooseOfList
               id={24}
               title='Исполнитель'
               className='mt15'
               list={props.employees.filter(employee => employee.role.permissions.includes('in_list_engineers'))}
               field='engineer_id'
               setElement={props.changeOperationForm}
               current_id={props.operation.engineer_id}
               employee={true}
               width={'250px'}
               checkedFlag='inputOperationEngineerChacked'
               checked={props.view.inputOperationEngineerChacked}
               disabled={props.operation.deleted}
            />
            <LableArea
               className='w250 mt15'
               title='Коментарий'
               onChange={event => props.changeOperationForm(event.target.value, 'comment')}
               value={props.operation.comment}
               disabled={props.operation.deleted}
            />
            <div className='mt15'>Сумма скидки: {props.operation.discount_value}</div>
            <div>Итого: {props.operation.total}</div>
            

         </div>
        

         <BottomButtons
            edit={props.operation.edit}
            deleted={props.operation.deleted}
            create={handleCreate}
            save={handleSave}
            delete={props.permissions.includes('setting_delete_service') ? () => props.deleteOperation(true) : null}
            recover={props.permissions.includes('setting_recover_service') ? () => props.deleteOperation(false) : null}
            close={handleClose}
         />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
   operation: state.operation,
   view: state.view,
   employees: state.data.employees.filter(employee => !employee.deleted),
   permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
   setVisibleFlag,
   resetOperation,
   changeOperationForm,
   createCustomOperation,
   saveOperation,
   deleteOperation
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationEditor)
