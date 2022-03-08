const initialState = {

    events: [],

    tabs: 0,

    edit: 0,
    event: '',
    target_audience: 0,
    notification_type: 1,
    statuses: [],
    notification_template_id: 0,
    template_title: '',
    template: '',
    deleted: false,

    showDeleted: false,
    filter_target_audience: 0
}

export const notEventReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_NOT_EVENT_FORM': {
            return {
                ...state,
                [action.field]: action.value
            }
        }

        case 'EDIT_NOT_EVENT': {
            return {
                ...state,
                edit: action.event.id,
                event: action.event.event,
                target_audience: action.event.target_audience,
                notification_type: action.event.notification_type,
                notification_template_id: action.event.template_id,
                statuses: action.event.statuses,
                deleted: action.event.deleted
            }
        }

        case 'RESET_NOT_EVENT': {
            return {
                ...state,
                edit: 0,
                event: '',
                target_audience: 0,
                notification_type: 1,
                notification_template_id: 0,
                statuses: [],
                template_title: '',
                template: '',
                deleted: false,
            }
        }

        case 'SELECTED_NOT_EVENT': {
            // Обявим переменную для изменных данных
            let new_data
            // Проверим если значения value в списке уже существующих
            if (action.value.every(val => state[action.field].includes(val))) {
                // Если есть удалим эти значения
                new_data = state[action.field].filter(val => !action.value.includes(val))
            } else {
                // Если нет добавим эти значения
                new_data = state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
            }
            // Если флаг saveToApp установлен сохраним данные на локальном хранилище
            if (action.saveToApp) localStorage.setItem(action.field, JSON.stringify(new_data))
            // Вернем изменненый стейт
            return {
                ...state,
                [action.field]: new_data,
            }
        }


        default: return state
    }

}