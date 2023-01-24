import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { 
   setVisibleFlag, 
   changeDictServiceForm,
   resetService,
   createDictService,
   saveDictService,
   deleteDictService
} from '../../../../Redux/actions'

import LableInput from '../../../general/LableInput'
import BottomButtons from '../../../general/BottomButtons'
import ChooseOfList from '../../../general/ChooseOfList'
import ChooseButton from '../../../general/ChooseButton'
import WarningOrange from '../../../general/WarningOrange'

const ServiceEditor = (props) => {

   const handleClose = () => {
      props.setVisibleFlag('statusServiceEditor', false)
      props.resetService()
     }
   
   const clickHandel = (event) => {
      if (!event.composedPath().map((el) => el.id).includes('serviceEditorWiondow')) {
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
      if (!props.edit) {props.changeDictServiceForm(props.dictService.seted_categiry, 'category_id')}
   }, [])

  const handleCreate = () => {
    if (props.dictService.title && props.dictService.category_id && props.dictService.price) {
      props.createDictService()
    } else {
      if (!props.dictService.title) props.setVisibleFlag('inputServiceTitleChecked', false)
      if (!props.dictService.category_id) props.setVisibleFlag('inputServiceCategoryIdChacked', false)
      if (!props.dictService.price) props.setVisibleFlag('inputServicePriceChacked', false)
    }
  }

  const handleSave = () => {
   if (props.dictService.title && props.dictService.category_id && props.dictService.price) {
      props.saveDictService()
    } else {
      if (!props.dictService.title) props.setVisibleFlag('inputServiceTitleChecked', false)
      if (!props.dictService.category_id) props.setVisibleFlag('inputServiceCategoryIdChacked', false)
      if (!props.dictService.price) props.setVisibleFlag('inputServicePriceChacked', false)
    }
 }

  return (
    <div className='rightBlock'>
      <div className='rightBlockWindow mwp' id='serviceEditorWiondow'>
         <div className='createNewTitle'>{props.dictService.edit ? props.dictService.title : 'Новая услуга'}</div>

         <div className='contentEditor'>
            <LableInput
               className='w250 mt15'
               title='Наименование'
               onChange={(event) => props.changeDictServiceForm(event.target.value, 'title')}
               value={props.dictService.title}
               checkedFlag='inputServiceTitleChecked'
               checked={props.view.inputServiceTitleChecked}
               redStar={ true }
               disabled={props.dictService.deleted}
            />
            <ChooseOfList
               id={23}
               title='Категория'
               className='mt15'
               list={props.group_dict_service}
               field='category_id'
               setElement={props.changeDictServiceForm}
               current_id={props.dictService.category_id}
               width={'250px'}
               checkedFlag='inputServiceCategoryIdChacked'
               checked={props.view.inputServiceCategoryIdChacked}
               disabled={props.dictService.deleted}
            />
            <LableInput
               className='w70 mt15'
               title='Цена'
               onChange={event => props.changeDictServiceForm(event.target.value.replace(/[^0-9.]/g, ''), 'price')}
               value={props.dictService.price}
               unit='руб.'
               checkedFlag='inputServicePriceChacked'
               checked={props.view.inputServicePriceChacked}
               redStar={ true }
               disabled={props.dictService.deleted}
            />
            <LableInput
               className='w70 mt15'
               title='Себестоимость'
               onChange={event => props.changeDictServiceForm(event.target.value.replace(/[^0-9.]/g, ''), 'cost')}
               value={props.dictService.cost}
               unit='руб.'
               disabled={props.dictService.deleted}
            />
            <div className='row al-itm-fe'>
               <LableInput
                  className='w70 mt15'
                  title='Гарантия'
                  onChange={event => props.changeDictServiceForm(event.target.value.replace(/[^0-9]/g, '') * props.dictService.warranty_value, 'warranty')}
                  value={parseInt(props.dictService.warranty / props.dictService.warranty_value)}
                  unit=' '
                  disabled={props.dictService.deleted}
               />
               <ChooseButton
                  className='ml30'
                  name={['Дни', 'Мес']}
                  func1 = {() => props.changeDictServiceForm(1*24*60*60, 'warranty_value')}
                  func2 = {() => props.changeDictServiceForm(30*24*60*60, 'warranty_value')}
                  disabled={props.dictService.deleted}
               />
            </div>
            <LableInput
               className='w250 mt15'
               title='Штрихкод'
               onChange={event => props.changeDictServiceForm(event.target.value, 'code')}
               value={props.dictService.code}
               disabled={props.dictService.deleted}
            />
            <h3>Вознаграждение исполнителю</h3>
            <WarningOrange
               text='Заполните эти поля, если хотите, чтобы за эту услугу исполнитель получал нестандартное вознаграждение. В противном случае оставьте эти поля пустыми, и при расчете ЗП будут учитываться общие правила расчета вознаграждения, заданные в карточке исполнителя'
            />
            <LableInput
               className='w70 mt15'
               title='Процент'
               onChange={event => props.changeDictServiceForm(event.target.value.replace(/[^0-9.]/g, ''), 'earnings_percent')}
               value={props.dictService.earnings_percent}
               unit='%'
               disabled={props.dictService.deleted}
            />
            <LableInput
               className='w70 mt15'
               title='Сумма'
               onChange={event => props.changeDictServiceForm(event.target.value.replace(/[^0-9.]/g, ''), 'earnings_summ')}
               value={props.dictService.earnings_summ}
               unit='руб'
               disabled={props.dictService.deleted}
            />

         </div>
        

         <BottomButtons
            edit={props.dictService.edit}
            deleted={props.dictService.deleted}
            create={handleCreate}
            save={handleSave}
            delete={props.permissions.includes('setting_delete_service') ? () => props.deleteDictService(true) : null}
            recover={props.permissions.includes('setting_recover_service') ? () => props.deleteDictService(false) : null}
            close={handleClose}
         />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
   dictService: state.dictService,
   view: state.view,
   group_dict_service: state.data.group_dict_service,
   permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
   changeDictServiceForm,
   setVisibleFlag,
   resetService,
   createDictService,
   saveDictService,
   deleteDictService
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEditor)
