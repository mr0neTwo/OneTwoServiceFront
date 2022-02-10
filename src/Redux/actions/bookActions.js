import store from '../store'
import { getRequestConfig, bad_request } from './actionUtils'

export function changeBookForm(value, field) {
  return {
    type: 'CHANGE_BOOK_FORM',
    field,
    value,
  }
}

export function createEquipmentType(title) {
  const state = store.getState()

  const request_config = title ? getRequestConfig({ title }) :
   getRequestConfig({
        title: state.book.title,
        icon: state.book.icon,
        url: state.book.url,
        branches: state.book.branches,
      })

      const request_config2 = getRequestConfig({
         title
       })

   return async (dispatch) => {
      await fetch(state.data.url_server + '/equipment_type', request_config)
         .catch(() => bad_request('Запрос на создание типа не выполнен'));

      await fetch(state.data.url_server + '/get_equipment_type', request_config2)
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_types',
               data: data.data
            })
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_type_count',
               data: data.count
            })
            } else {
               console.warn(data.massage)
            }
         })
         .catch(() => bad_request('Запрос типов тихеники не выполнен'))
   }
}

export function addEquipmentType() {
   const state = store.getState()
 
   const request_config = getRequestConfig({
     title: state.book.filter_type,
     page: state.book.page_type-1
   })
 
   return async (dispatch) => {
     await fetch(state.data.url_server + '/get_equipment_type', request_config)
       .then((response) => response.json())
       .then((data) => {
         if (data.success) {
           dispatch({
             type: 'ADD_DATA',
             field: 'equipment_types',
             data: data.data
           })
           dispatch({
             type: 'ADD_DATA',
             field: 'equipment_type_count',
             data: data.count
           })
         } else {
           console.warn(data.massage)
         }
       })
       .catch(() => bad_request('Запрос типов тихеники не выполнен'))
   }
 }

export function createEquipmentBrand(idx, title) {
   const state = store.getState()

   const request_config = getRequestConfig({
      title,
      equipment_type_id: state.order.edit ? state.order.kindof_good.id : state.order.equipments[idx].kindof_good.id
   })

   const request_config2 = getRequestConfig({
      title,
      equipment_type_id: state.book.equipment_type.id,
   })

   return async (dispatch) => {
      await fetch(state.data.url_server + '/equipment_brand', request_config)
         .catch(() => bad_request('Запрос на создание бренда не выполнен'))

      await fetch(state.data.url_server + '/get_equipment_brand', request_config2)
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_brands',
               data: data.data
            })
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_brand_count',
               data: data.count
            })
            } else {
            console.warn(data.massage)
            }
         })
         .catch(() => bad_request('Запрос брендов не выполнен'))
   }
}

export function addEquipmentBrand() {
   const state = store.getState()
 
   const request_config = getRequestConfig({
     title: state.book.filter_brand,
     equipment_type_id: state.book.equipment_type.id,
     page: state.book.page_brand-1
   })
 
   return async (dispatch) => {
     await fetch(state.data.url_server + '/get_equipment_brand', request_config)
       .then((response) => response.json())
       .then((data) => {
         if (data.success) {
           dispatch({
             type: 'ADD_DATA',
             field: 'equipment_brands',
             data: data.data
           })
           dispatch({
             type: 'ADD_DATA',
             field: 'equipment_brand_count',
             data: data.count
           })
         } else {
           console.warn(data.massage)
         }
       })
       .catch(() => bad_request('Запрос брендов не выполнен'))
   }
 }

export function cteateEquipmentSubtype(idx, title) {
   const state = store.getState()

   const request_config = getRequestConfig({
      title,
      equipment_brand_id: state.order.edit ? state.order.brand.id : state.order.equipments[idx].brand.id 
   })
   
   const request_config2 = getRequestConfig({
      title,
      equipment_brand_id: state.book.equipment_brand.id,
   })

   return async (dispatch) => {
      await fetch(state.data.url_server + '/equipment_subtype',request_config)
      .catch(() => bad_request('Запрос на создание подтипа не выполнен'))

      await fetch(state.data.url_server + '/get_equipment_subtype', request_config2)
         .then((response) => response.json())
         .then((data) => {
         if (data.success) {
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_subtypes',
               data: data.data,
            })
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_subtype_count',
               data: data.count,
            })
         } else {
            console.warn(data.massage)
         }
         })
         .catch(() => bad_request('Запрос модулей не выполнен'))
   }
}

export function addEquipmentSubtype() {
  const state = store.getState()

  const request_config = getRequestConfig({
    title: state.book.filter_subtype,
    equipment_brand_id: state.book.equipment_brand.id,
    page: state.book.page_subtype-1
  })

  return async (dispatch) => {
    await fetch(state.data.url_server + '/get_equipment_subtype', request_config)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: 'ADD_DATA',
            field: 'equipment_subtypes',
            data: data.data,
          })
          dispatch({
            type: 'ADD_DATA',
            field: 'equipment_subtype_count',
            data: data.count,
          })
        } else {
          console.warn(data.massage)
        }
      })
      .catch(() => bad_request('Запрос модулей не выполнен'))
  }
}

export function createEquipmentModel(idx, title) {
   const state = store.getState()

   const request_config = getRequestConfig({
      title,
      equipment_subtype_id: state.order.edit ? state.order.subtype.id : state.order.equipments[idx].subtype.id 
   })

   const request_config2 = getRequestConfig({
      title,
      equipment_subtype_id: state.book.equipment_subtype.id
   })

   return async (dispatch) => {
      await fetch(state.data.url_server + '/equipment_model', request_config)
      .catch(() => bad_request('Запрос на создание модели не выполнен'))

      await fetch(state.data.url_server + '/get_equipment_model', request_config2)
         .then((response) => response.json())
         .then((data) => {
         if (data.success) {
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_models',
               data: data.data,
            })
            dispatch({
               type: 'ADD_DATA',
               field: 'equipment_models_count',
               data: data.count,
            })
         } else {
            console.warn(data.massage)
         }
         })
         .catch(() => bad_request('Запрос моделей не выполнен'))
   }
}

export function addEquipmentModel() {
  const state = store.getState()

  const request_config = getRequestConfig({
    title: state.book.filter_model,
    equipment_subtype_id: state.book.equipment_subtype.id,
    page: state.book.page_model-1
  })

  return async (dispatch) => {
    await fetch(state.data.url_server + '/get_equipment_model', request_config)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: 'ADD_DATA',
            field: 'equipment_models',
            data: data.data,
          })
          dispatch({
            type: 'ADD_DATA',
            field: 'equipment_models_count',
            data: data.count,
          })
        } else {
          console.warn(data.massage)
        }
      })
      .catch(() => bad_request('Запрос моделей не выполнен'))
  }
}
