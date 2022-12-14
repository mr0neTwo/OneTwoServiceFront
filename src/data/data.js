export const order_event_types = [
    {id: 1, title: 'Заказ создан', value: 'CREATE_ORDER'},
    {id: 2, title: 'Инженер назанчен', value: 'ASSIGN_ENGINEER'},
    {id: 3, title: 'Инженер изменен', value: 'CHANGE_ENGINEER'},
    {id: 4, title: 'Менеджер назначен', value: 'ASSIGN_MANAGER'},
    {id: 5, title: 'Менеджер изменен', value: 'CHANGE_MANAGER'},
    {id: 6, title: 'Добавлен клиент', value: 'ADD_CLIENT'},
    {id: 7, title: 'Клиент изменен', value: 'CHANGE_CLIENT'},
    {id: 8, title: 'Изменение данных', value: 'CHANGE_DATA'},
    {id: 9, title: 'Срок выполнения изменен', value: 'CHANGE_ESTIMATED_DONE_AT'},
    {id: 10, title: 'Добавлена операция', value: 'ADD_OPERATION'},
    {id: 11, title: 'Операция удалена', value: 'DELETE_OPERATION'},
    {id: 12, title: 'Операция изменена', value: 'CHANGE_OPERATION'},
    {id: 13, title: 'Добавлена запчасть', value: 'ADD_ORDER_PART'},
    {id: 14, title: 'Запчасть удалена', value: 'DELETE_ORDER_PART'},
    {id: 15, title: 'Запчасть изменена', value: 'CHANGE_ORDER_PART'},
    {id: 16, title: 'Платеж добавлен', value: 'ADD_PAYMENT'},
    {id: 17, title: 'Платеж удален', value: 'DELETE_PAYMENT'},
    {id: 18, title: 'Статус изменен', value: 'CHANGE_STATUS'},
    {id: 19, title: 'Коментарии', value: 'ADD_COMMENT'},
    {id: 20, title: 'SMS оповещение', value: 'SEND_SMS'},
    {id: 21, title: 'Email оповещение', value: 'SEND_EMAIL'},
    {id: 22, title: 'Перемещение заказа', value: 'MOVE_TO'}
]

export const request_event_types = [
    {id: 1, title: 'Запрос создан', value: 'CREATE_REQUEST_SPARE_PART'},
    {id: 2, title: 'Добавлена запчасть', value: 'ADD_PART'},
    {id: 3, title: 'Назначен исполнитель', value: 'ASSIGN_EXECUTOR'},
    {id: 4, title: 'Добавлен поставщик', value: 'ADD_SUPPLER'},
    {id: 5, title: 'Добавлен клиент', value: 'ADD_CLIENT'},
    {id: 6, title: 'Добавлен заказ', value: 'ADD_ORDER'},
    {id: 7, title: 'Запчасть изменена', value: 'CHANGE_PART'},
    {id: 8, title: 'Исполнитель изменен', value: 'CHANGE_EXECUTOR'},
    {id: 9, title: 'Изменен постовщик', value: 'CHANGE_SUPPLER'},
    {id: 10, title: 'Изменен клиент', value: 'CHANGE_CLIENT'},
    {id: 11, title: 'Изменен заказ', value: 'CHANGE_ORDER'},
    {id: 12, title: 'Изменены данные', value: 'CHANGE_DATA'},
    {id: 13, title: 'Статус изменен', value: 'CHANGE_STATUS'},
    {id: 14, title: 'Добавлен комментарий', value: 'ADD_COMMENT'},
    {id: 15, title: 'Изменен срок поставки', value: 'CHANGE_ESTIMATED_COME_AT'},
    {id: 15, title: 'Установлен срок поставки', value: 'ADD_ESTIMATED_COME_AT'}
]