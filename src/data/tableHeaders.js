export const part_table_headers = [
    {
        id: 1,
        title: 'Наименование',
        field: 'title'
    },{
        id: 2,
        title: 'Описание',
        field: 'description'
    },{
        id: 3,
        title: 'Маркировка',
        field: 'marking'
    },{
        id: 4,
        title: 'Артикул',
        field: 'article'
    },{
        id: 5,
        title: 'Штрихкод',
        field: 'barcode'
    },{
        id: 6,
        title: 'Код',
        field: 'code'
    },{
        id: 7,
        title: 'Изображение',
        field: 'image_url',
        width: 100,
        order: 7
    },{
        id: 8,
        title: 'Категория',
        field: 'warehouse_category'
    },{
        id: 9,
        title: 'Документация',
        field: 'doc_url'
    }
]

export const registrations_table_headers = [
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
]

export const service_table_headers = [
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
]

export const remain_headers = [
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
]

export const write_of_headers = [
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
]