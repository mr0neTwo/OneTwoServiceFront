 const dataTableHeader = [
   {
      id: 1,
      title: 'Заказ № ',
      field: 'id',
      width: '90px'
   },{
      id: 2,
      title: 'Создан ',
      field: 'created_at',
      width: '150px'
   },{
      id: 3,
      title: 'Срок заказа ',
      field: 'estimated_done_at',
      width: '150px'
   },{
      id: 4,
      title: 'Статус ',
      field: 'istatus.name',
      width: '150px'
   },{
      id: 5,
      title: 'Тип устройства ',
      field: 'custom_fields.f718506',
      width: '150px'
   },{
      id: 6,
      title: 'Бренд ',
      field: 'custom_fields.f718512',
      width: '130px'
   },{
      id: 7,
      title: 'Неисправность ',
      field: 'malfunction',
      width: '130px'
   },{
      id: 8,
      title: 'Исполнитель ',
      field: 'engineer_id',
      width: '150px'
   },{
      id: 9,
      title: 'Клиент ',
      field: 'client.name',
      width: '180px'
   },{
      id: 10,
      title: 'Цена ',
      field: 'price',
      width: '130px'
   },{
      id: 11,
      title: 'Заметки исполнителя ',
      field: 'engineer_notes',
      width: '150px'
   }
]

export default dataTableHeader