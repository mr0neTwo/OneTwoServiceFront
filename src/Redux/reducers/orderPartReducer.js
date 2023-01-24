
const initialState = {

    edit: 0,                    // id редактируемоей запчасти
    amount: 1,                  // Количество
    cost: 0,                    // Себестоимость
    discount_value: 0,          // Сумма скидки
    engineer: {},               // Инженер
    price: 0,                   // Цена запчасти
    total: 0,                   // Итоговая сумма
    title: '',                  // Наименование запачасти
    comment: '',                // Комментарий
    deleted: false,             // Удален
    warranty_period: 0,         // Период гарантии
    created_at: 0,              // Дата создания
    order_id: 0,                // id заказа
    warehouse_parts_id: 0,      // С какой партии добавлена запчасть
    to_warehouse_id: 0,         // Куда вернуть при удалении

    warranty_value: 30*24*60*60, // Значение гарантии для конвертации из введеных пользователем значений в timestamp (количество секунд в месяце из 30 дней)
    percent: true,              // true - вычисляем процент, false - сумму в скидке discount_value
    discount: 0                 // Значение скидки введенное пользователем
}

export const orderPartReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_ORDER_PART_STATE': {
            return {...Object.assign(state, action.data)}
        }

        case 'EDIT_ORDER_PART': {
            return {
                ...state,
                edit: action.order_part.id,
                amount: action.order_part.amount,
                cost: action.order_part.cost,
                discount_value: action.order_part.discount_value,
                engineer: action.order_part.engineer,
                price: action.order_part.price,
                total: action.order_part.total,
                title: action.order_part.title,
                comment: action.order_part.comment,
                deleted: action.order_part.deleted,
                warranty_period: action.order_part.warranty_period,
                created_at: action.order_part.created_at,
                order_id: action.order_part.order_id,
                warehouse_parts_id: action.order_part.warehouse_parts_id
            }
        }

        case 'RESET_ORDER_PART': {
            return {
                ...state,
                edit: 0,
                amount: 1,
                cost: 0,
                discount_value: 0,
                engineer: {},
                price: 0,
                total: 0,
                title: '',
                comment: '',
                deleted: false,
                warranty_period: 0,
                created_at: 0,
                order_id: 0,
                warehouse_parts_id: 0,

                warranty_value: 30*24*60*60,
                percent: true,
                discount: 0

            }
        }

        case 'SELECTED_ORDER_PART': {
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