export const order_event_types = [
    {id: 1, visible: true, title: 'Заказ создан', value: 'CREATE_ORDER'},
    {id: 2, visible: true, title: 'Инженер назанчен', value: 'ASSIGN_ENGINEER'},
    {id: 3, visible: true, title: 'Инженер изменен', value: 'CHANGE_ENGINEER'},
    {id: 4, visible: true, title: 'Менеджер назначен', value: 'ASSIGN_MANAGER'},
    {id: 5, visible: true, title: 'Менеджер изменен', value: 'CHANGE_MANAGER'},
    {id: 6, visible: true, title: 'Добавлен клиент', value: 'ADD_CLIENT'},
    {id: 7, visible: true, title: 'Клиент изменен', value: 'CHANGE_CLIENT'},
    {id: 8, visible: true, title: 'Изменение данных', value: 'CHANGE_DATA'},
    {id: 9, visible: true, title: 'Срок выполнения изменен', value: 'CHANGE_ESTIMATED_DONE_AT'},
    {id: 10, visible: true, title: 'Добавлена операция', value: 'ADD_OPERATION'},
    {id: 11, visible: true, title: 'Операция удалена', value: 'DELETE_OPERATION'},
    {id: 12, visible: true, title: 'Операция изменена', value: 'CHANGE_OPERATION'},
    {id: 13, visible: true, title: 'Добавлена запчасть', value: 'ADD_ORDER_PART'},
    {id: 14, visible: true, title: 'Запчасть удалена', value: 'DELETE_ORDER_PART'},
    {id: 15, visible: true, title: 'Запчасть изменена', value: 'CHANGE_ORDER_PART'},
    {id: 16, visible: true, title: 'Платеж добавлен', value: 'ADD_PAYMENT'},
    {id: 17, visible: true, title: 'Платеж удален', value: 'DELETE_PAYMENT'},
    {id: 18, visible: true, title: 'Статус изменен', value: 'CHANGE_STATUS'},
    {id: 19, visible: true, title: 'Коментарии', value: 'ADD_COMMENT'},
    {id: 20, visible: true, title: 'SMS оповещение', value: 'SEND_SMS'},
    {id: 21, visible: true, title: 'Email оповещение', value: 'SEND_EMAIL'},
    {id: 22, visible: true, title: 'Перемещение заказа', value: 'MOVE_TO'}
]

export const request_event_types = [
    {id: 1, visible: true, title: 'Запрос создан', value: 'CREATE_REQUEST_SPARE_PART'},
    {id: 2, visible: true, title: 'Добавлена запчасть', value: 'ADD_PART'},
    {id: 3, visible: true, title: 'Назначен исполнитель', value: 'ASSIGN_EXECUTOR'},
    {id: 4, visible: true, title: 'Добавлен поставщик', value: 'ADD_SUPPLER'},
    {id: 5, visible: true, title: 'Добавлен клиент', value: 'ADD_CLIENT'},
    {id: 6, visible: true, title: 'Добавлен заказ', value: 'ADD_ORDER'},
    {id: 7, visible: true, title: 'Запчасть изменена', value: 'CHANGE_PART'},
    {id: 8, visible: true, title: 'Исполнитель изменен', value: 'CHANGE_EXECUTOR'},
    {id: 9, visible: true, title: 'Изменен постовщик', value: 'CHANGE_SUPPLER'},
    {id: 10, visible: true, title: 'Изменен клиент', value: 'CHANGE_CLIENT'},
    {id: 11, visible: true, title: 'Изменен заказ', value: 'CHANGE_ORDER'},
    {id: 12, visible: true, title: 'Изменены данные', value: 'CHANGE_DATA'},
    {id: 13, visible: true, title: 'Статус изменен', value: 'CHANGE_STATUS'},
    {id: 14, visible: true, title: 'Добавлен комментарий', value: 'ADD_COMMENT'},
    {id: 15, visible: true, title: 'Изменен срок поставки', value: 'CHANGE_ESTIMATED_COME_AT'},
    {id: 15, visible: true, title: 'Установлен срок поставки', value: 'ADD_ESTIMATED_COME_AT'}
]

export const Payment = {
    Direction: {
        MOVEMENT: 0,
        OUTCOME: 1,
        INCOME: 2
    },
    SumConfiguration: [
        'ru',
        {
            style: 'currency',
            currency: 'RUB'
        }
    ]
}

export const Modal = {
    Type: {
        ORDER: 0,
        PAYMENT: 1,
        PART: 2,
        RESIDUE_RULE: 3
    }
}

