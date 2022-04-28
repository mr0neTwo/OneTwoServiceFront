const dataTableHeader = [
    {
        id: 1,
        title: 'Заказ №',
        field: 'id',
        width: 90,
        visible: true,
        order: 1
    }, {
        id: 2,
        title: 'Создан',
        field: 'created_at',
        width: 150,
        visible: true,
        order: 2
    }, {
        id: 3,
        title: 'Срок заказа',
        field: 'estimated_done_at',
        width: 150,
        visible: true,
        order: 3
    }, {
        id: 4,
        title: 'Статус',
        field: 'status.name',
        width: 150,
        visible: true,
        order: 4
    }, {
        id: 5,
        title: 'Устройство',
        field: 'equipment',
        width: 150,
        visible: true,
        order: 5
    }, {
        id: 6,
        title: 'Тип устройства',
        field: 'kindof_good',
        width: 150,
        visible: true,
        order: 6
    }, {
        id: 7,
        title: 'Бренд',
        field: 'brand',
        width: 130,
        visible: true,
        order: 7
    },{
        id: 8,
        title: 'Модуль/Серия',
        field: 'subtype',
        width: 130,
        visible: true,
        order: 8
    }, {
        id: 9,
        title: 'Неисправность',
        field: 'malfunction',
        width: 130,
        visible: true,
        order: 9
    }, {
        id: 10,
        title: 'Исполнитель',
        field: 'engineer_id',
        width: 150,
        visible: true,
        order: 10
    }, {
        id: 11,
        title: 'Менеджер ',
        field: 'manager_id',
        width: 150,
        visible: true,
        order: 11
    }, {
        id: 12,
        title: 'Клиент',
        field: 'client.name',
        width: 150,
        visible: true,
        order: 12
    }, {
        id: 13,
        title: 'Цена',
        field: 'price',
        width: 130,
        visible: true,
        order: 13
    }, {
        id: 14,
        title: 'К оплате',
        field: 'price',
        width: 130,
        visible: true,
        order: 14
    }, {
        id: 15,
        title: 'Заметки исполнителя',
        field: 'engineer_notes',
        width: 130,
        visible: true,
        order: 15
    }, {
        id: 16,
        title: 'Заметки менеджера',
        field: 'manager_notes',
        width: 150,
        visible: true,
        order: 16
    }, {
        id: 17,
        title: 'Ячейка',
        field: 'engineer_notes',
        width: 150,
        visible: true,
        order: 17
    }, {
        id: 18,
        title: 'Рекламная компания',
        field: 'cell',
        width: 150,
        visible: true,
        order: 18
    }
]

export default dataTableHeader