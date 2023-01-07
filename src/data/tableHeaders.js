export const Table = {
    Fields: {
        Part: [
            {
                id: 1,
                title: 'Наименование',
                field: 'title',
                width: 120,
                order: 1
            },{
                id: 2,
                title: 'Описание',
                field: 'description',
                width: 150,
                order: 2
            },{
                id: 3,
                title: 'Маркировка',
                field: 'marking',
                width: 100,
                order: 3
            },{
                id: 4,
                title: 'Артикул',
                field: 'article',
                width: 80,
                order: 4
            },{
                id: 5,
                title: 'Штрихкод',
                field: 'barcode',
                width: 80,
                order: 5
            },{
                id: 6,
                title: 'Код',
                field: 'code',
                width: 80,
                order: 6
            },{
                id: 7,
                title: 'Изображение',
                field: 'image_url',
                width: 100,
                order: 7
            },{
                id: 8,
                title: 'Категория',
                field: 'warehouse_category',
                width: 100,
                order: 8
            },{
                id: 9,
                title: 'Документация',
                field: 'doc_url',
                width: 100,
                order: 9
            }
        ],
        Registration: [
            {
                id: 1,
                title: 'Документ №',
                field: 'label',
                width: 82,
                order: 1
            },{
                id: 2,
                title: 'Накладная №',
                field: 'number',
                width: 90,
                order: 2
            },{
                id: 3,
                title: 'Создан',
                field: 'custom_created_at',
                width: 140,
                order: 3
            },{
                id: 4,
                title: 'Комментарий',
                field: 'description',
                width: 140,
                order: 4
            },{
                id: 5,
                title: 'Поставщик',
                field: 'client.name',
                width: 100,
                order: 5
            },{
                id: 6,
                title: 'Склад',
                field: 'warehouse.title',
                width: 100,
                order: 6
            },{
                id: 7,
                title: 'Сумма, руб.',
                field: 'price',
                width: 100,
                order: 8
            }
        ],
        Service:  [
            {
                id: 1,
                title: 'Наименование',
                field: 'title',
                width: 150,
                order: 1
            },{
                id: 2,
                title: 'Гаранития',
                field: 'werranty',
                width: 70,
                order: 2
            },{
                id: 3,
                title: 'Себестоимость',
                field: 'cost',
                width: 70,
                order: 3
            },{
                id: 4,
                title: 'Цена',
                field: 'price',
                width: 70,
                order: 4
            },{
                id: 5,
                title: 'Код',
                field: 'code',
                width: 70,
                order: 5
            }
        ],
        Remain: [
            {
                id: 1,
                title: 'Наименование',
                field: 'title',
                width: 100,
                order: 1
            },{
                id: 2,
                title: 'Маркировка',
                field: 'marking',
                width: 90,
                order: 2
            },{
                id: 3,
                title: 'Описание',
                field: 'description',
                width: 140,
                order: 3
            },{
                id: 4,
                title: 'Артикул',
                field: 'article',
                width: 100,
                order: 4
            },{
                id: 5,
                title: 'Штрихкод',
                field: 'barcode',
                width: 100,
                order: 5
            },{
                id: 6,
                title: 'Код',
                field: 'code',
                width: 100,
                order: 6
            },{
                id: 7,
                title: 'Изображение',
                field: 'image_url',
                width: 100,
                order: 7
            },{
                id: 8,
                title: 'Документация',
                field: 'doc_url',
                width: 100,
                order: 8
            },{
                id: 9,
                title: 'Остаток',
                field: 'count',
                width: 100,
                order: 9
            },{
                id: 10,
                title: 'Мин. остаток',
                field: 'min_residue',
                width: 100,
                order: 10
            },{
                id: 11,
                title: 'Гарантийный период',
                field: 'warranty_period',
                width: 100,
                order: 11
            }, {
                id: 12,
                title: 'Адрес хранения',
                field: 'cell',
                width: 100,
                order: 12
            }
        ],
        WriteOf: [
            {
                id: 1,
                title: 'Списание №',
                field: 'label',
                width: 70,
                order: 1
            },{
                id: 2,
                title: 'Создано',
                field: 'created_at',
                width: 100,
                order: 2
            },{
                id: 3,
                title: 'Склад',
                field: 'warehouse.title',
                width: 140,
                order: 3
            },{
                id: 4,
                title: 'Описание',
                field: 'description',
                width: 140,
                order: 4
            }
        ],
        Movement: [
            {
                id: 1,
                title: 'Перемещение №',
                field: 'label',
                width: 70,
                order: 1
            },{
                id: 2,
                title: 'Создано',
                field: 'created_at',
                width: 100,
                order: 2
            },{
                id: 3,
                title: 'Со склада',
                field: 'warehouse.title',
                width: 140,
                order: 3
            },{
                id: 4,
                title: 'В склад',
                field: 'target_warehouse.title',
                width: 140,
                order: 4
            },{
                id: 5,
                title: 'Описание',
                field: 'description',
                width: 140,
                order: 5
            }
        ],
        Back: [
            {
                id: 1,
                title: 'Возврат №',
                field: 'label',
                width: 70,
                order: 1
            },{
                id: 2,
                title: 'Создано',
                field: 'created_at',
                width: 100,
                order: 2
            },{
                id: 3,
                title: 'Со склада',
                field: 'warehouse.title',
                width: 140,
                order: 3
            },{
                id: 4,
                title: 'Поставщик',
                field: 'client.name',
                width: 140,
                order: 4
            },{
                id: 5,
                title: 'Основание',
                field: 'registration.label',
                width: 140,
                order: 5
            },{
                id: 6,
                title: 'Описание',
                field: 'description',
                width: 140,
                order: 6
            }
        ],
        Inventory: [
            {
                id: 1,
                title: 'Инвентаризация №',
                field: 'label',
                width: 70,
                order: 1
            },{
                id: 2,
                title: 'Создано',
                field: 'created_at',
                width: 100,
                order: 2
            },{
                id: 3,
                title: 'Склад',
                field: 'warehouse.title',
                width: 140,
                order: 3
            },{
                id: 4,
                title: 'Категория',
                field: 'category.title',
                width: 140,
                order: 4
            },{
                id: 5,
                title: 'Описание',
                field: 'description',
                width: 140,
                order: 5
            }
        ],
        RequestSparePart: [
            {
                id: 1,
                title: 'Запрос №',
                field: 'label',
                width: 70,
                order: 1
            },{
                id: 2,
                title: 'Создано',
                field: 'created_at',
                width: 100,
                order: 2
            },{
                id: 3,
                title: 'Будет доставлен',
                field: 'estimated_come_at',
                width: 100,
                order: 3
            },{
                id: 4,
                title: 'Запчасть',
                field: 'part',
                width: 100,
                order: 4
            },{
                id: 5,
                title: 'Статус',
                field: 'status',
                width: 100,
                order: 5
            },{
                id: 6,
                title: 'Количество',
                field: 'amount',
                width: 100,
                order: 6
            },{
                id: 7,
                title: 'Стоимость',
                field: 'cost',
                width: 100,
                order: 7
            },{
                id: 8,
                title: 'Комментарий',
                field: 'description',
                width: 140,
                order: 8
            },{
                id: 9,
                title: 'Исполнитель',
                field: 'executor',
                width: 100,
                order: 9
            },{
                id: 10,
                title: 'Клиент',
                field: 'client',
                width: 100,
                order: 10
            },{
                id: 11,
                title: 'Поставщик',
                field: 'supplier',
                width: 100,
                order: 11
            },{
                id: 12,
                title: 'Заказ',
                field: 'order',
                width: 100,
                order: 12
            }
        ],
        Order: [
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
                field: 'missed_payments',
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
                field: 'ad_campaign_id',
                width: 150,
                visible: true,
                order: 18
            }
        ]
    }
}



