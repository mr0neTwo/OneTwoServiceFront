 export const generally = [
   {
      value: 'to_lend', // не реализовано
      description: 'Может проводить платежи в счёт долга клиента'
   },{
      value: 'see_purchase', // не реализовано
      description: 'Может видеть закупочную цену товаров'
   },{
      value: 'handle_discount', // не реализовано
      description: 'Может задавать скидки в документах'
   },{
      value: 'handle_type_discount', // не реализовано
      description: 'Может указывать тип скидки'
   },{
      value: 'handle_cost_price', // не реализовано
      description: 'Может задавать себестоимость в документах'
   },{
      value: 'see_profit', // не реализовано
      description: 'Может видеть расчётную прибыль'
   },{
      value: 'in_list_managers', 
      description: 'Отображать сотрудника в списке менеджеров'
   },{
      value: 'in_list_engineers', 
      description: 'Отображать сотрудника в списке исполнителей'
   },{
      value: 'send_sms', // не реализовано
      description: 'Может отправлять SMS'
   },{
      value: 'see_price', // не реализовано
      description: 'Может видеть стоимость изделия'
   }
]

export const task = [
   {
      value: 'create_task', // не реализовано
      description: 'Может создавать задачи'
   },{
      value: 'do_task', // не реализовано
      description: 'Может быть исполнителем'
   },{
      value: 'see_all_task', // не реализовано
      description: 'Может видеть задачи всех сотрудников'
   },{
      value: 'edit_all_task', // не реализовано
      description: 'Может редактировать задачи всех сотрудников'
   }
]

export const leads = [
   {
      value: 'see_leads', // не реализовано
      description: 'Может видеть обращения'
   },{
      value: 'create_leads', // не реализовано
      description: 'Может создавать обращения'
   },{
      value: 'edit_leads', // не реализовано
      description: 'Может редактировать обращения'
   },{
      value: 'delete_leads', // не реализовано
      description: 'Может удалять обращения'
   }
]

export const orders = [
   {
      value: 'create_orders', 
      description: 'Может создавать заказы'
   },{
      value: 'move_orders', // не реализовано
      description: 'Может перемещать заказы'
   },{
      value: 'delete_orders', // не реализовано
      description: 'Может удалять заказы'
   },{
      value: 'assing_emploees', 
      description: 'Может назначать менеджера и исполнителя в заказ'
   },{
      value: 'see_client', 
      description: 'Может видеть информацию о клиенте'
   },{
      value: 'see_calls', // не реализовано
      description: 'Может видеть звонки'
   },{
      value: 'edit_info_orders', 
      description: 'Может редактировать поля «Информация о заказе»'
   },{
      value: 'edit_operations_materials', 
      description: 'Может редактировать поля «Работы и материалы»'
   },{
      value: 'add_service_list', // не реализовано
      description: 'Может добавлять услуги из прейскуранта'
   },{
      value: 'add_servece_not_list', // не реализовано
      description: 'Может добавлять услуги которых нет в прейскуранте'
   },{
      value: 'add_materials_warehouse', // не реализовано
      description: 'Может добавлять материалы со склада'
   },{
      value: 'add_materials_not_warehouse', // не реализовано
      description: 'Может добавлять материалы которых нет на складе'
   },{
      value: 'create_books', // не реализовано
      description: 'Может создавать элементы в справочнике изделий'
   },{
      value: 'edit_service_price', // не реализовано
      description: 'Может редактировать цену услуг'
   },{
      value: 'edit_materials_price', // не реализовано
      description: 'Может редактировать цену материалов'
   },{
      value: 'edit_closed_order', // не реализовано
      description: 'Может редактировать закрытый заказ'
   },{
      value: 'generally_custom_filters', // не реализовано
      description: 'Может создавать, редактировать и удалять общие фильтры'
   },{
      value: 'cteate_equipment', // не реализовано
      description: 'Может создавать изделия'
   }
]

export const sales = [
   {
      value: 'make_sales', // не реализовано
      description: 'Может создавать продажи'
   },{
      value: 'delete_sales', // не реализовано
      description: 'Может удалять продажи'
   },{
      value: 'sale_service', // не реализовано
      description: 'Может продавать услуги'
   },{
      value: 'edit_sale_price', // не реализовано
      description: 'Может редактировать цену'
   }
]

export const finance = [
   {
      value: 'make_income', 
      description: 'Может вносить деньги'
   },{
      value: 'move_money',
      description: 'Может перемещать деньги'
   },{
      value: 'make_expenditure',
      description: 'Может расходовать деньги'
   },{
      value: 'backdating',
      description: 'Может вносить, перемещать и расходовать деньги задним числом'
   },{
      value: 'see_moving_money',
      description: 'Может видеть движение денег'
   },{
      value: 'see_moving_money_all_time',
      description: 'Может видеть движение денег за произвольный период дат'
   },{
      value: 'delete_payments', 
      description: 'Может удалять операции в кассе'
   },{
      value: 'see_delete_payments', 
      description: 'Может видеть удаленные операции в кассе'
   },{
      value: 'recover_payments', 
      description: 'Может восстанавливать операции в кассе'
   },{
      value: 'print_moving_money', // не реализовано
      description: 'Может печатать движение денег'
   },{
      value: 'see_remains',
      description: 'Может видеть остаток денег в кассе'
   },{
      value: 'edit_cash',
      description: 'Может создавать, редактировать и удалять кассы'
   },{
      value: 'choose_emploees', 
      description: 'Может выбирать любого сотрудника из списка'
   },{
      value: 'invoices', // не реализовано
      description: 'Счета'
   },{
      value: 'see_clients_balance', // не реализовано
      description: 'Может видеть взаиморасчёты'
   },{
      value: 'create_refund', // не реализовано
      description: 'Может создавать возвраты'
   },{
      value: 'delete_refund', // не реализовано
      description: 'Может удалять возвраты'
   },{
      value: 'edit_refund', // не реализовано
      description: 'Может редактировать цену возврата'
   },{
      value: 'see_all_payrolls',
      description: 'Может видеть начисления ЗП других сотрудников'
   },{
      value: 'create_payrolls', 
      description: 'Может добавлять перемию/взыскание'
   },{
      value: 'see_seleted_payrolls', 
      description: 'Может видеть удаленные начисления ЗП'
   },{
      value: 'delete_payrolls', 
      description: 'Может удалять начисления ЗП'
   },{
      value: 'recover_payrolls', 
      description: 'Может восстанавливать начисления ЗП'
   }
]

export const warehouse = [
   {
      value: 'see_remaining_warehouse', // не реализовано
      description: 'Может видеть остатки'
   },{
      value: 'see_equipment_warehouse', // не реализовано
      description: 'Может просматривать изделия'
   },{
      value: 'create_equipment_warehouse', // не реализовано
      description: 'Может создавать изделия'
   },{
      value: 'edit_equipment_warehouse', // не реализовано
      description: 'Может редактировать изделия'
   },{
      value: 'write_of_equipment', // не реализовано
      description: 'Может списывать изделия'
   },{
      value: 'combine_equipment', // не реализовано
      description: 'Может объединять изделия'
   },{
      value: 'move_equipment', // не реализовано
      description: 'Может перемещать изделия'
   },{
      value: 'see_registrations', // не реализовано
      description: 'Может просматривать оприходования'
   },{
      value: 'create_registrations', // не реализовано
      description: 'Может создавать оприходования'
   },{
      value: 'delete_registrations', // не реализовано
      description: 'Может удалять оприходования'
   },{
      value: 'write_of_warehouse', // не реализовано
      description: 'Списание'
   },{
      value: 'move_warehouse', // не реализовано
      description: 'Перемещения'
   },{
      value: 'see_inventory', // не реализовано
      description: 'Может просматривать инвентаризации'
   },{
      value: 'see_inventory_total', // не реализовано
      description: 'Может просматривать итоги инвентаризации'
   },{
      value: 'create_inventory', // не реализовано
      description: 'Может создавать инвентаризации'
   },{
      value: 'delete_inventory', // не реализовано
      description: 'Может удалять инвентаризации'
   },{
      value: 'see_refund_to_supplier', // не реализовано
      description: 'Может просматривать возвраты'
   },{
      value: 'create_refund_to_supplier', // не реализовано
      description: 'Может создавать возвраты'
   },{
      value: 'create_new_goods', // не реализовано
      description: 'Может создавать новые товары'
   },{
      value: 'serial_accounting', // не реализовано
      description: 'Может включать серийный учет для существующих товаров'
   },{
      value: 'edit_goods', // не реализовано
      description: 'Может редактировать товары'
   },{
      value: 'edit_goods_categories', // не реализовано
      description: 'Может редактировать категории товаров'
   },{
      value: 'delete_goods', // не реализовано
      description: 'Может удалять товары'
   },{
      value: 'delete_operation_of_warehouse', // не реализовано
      description: 'Может удалять операции на складе'
   }
]

export const clients = [
   {
      value: 'see_table_clients', // не реализовано
      description: 'Может видеть таблицу клиентов'
   },{
      value: 'see_buyer', // не реализовано
      description: 'Может видеть покупателей'
   },{
      value: 'see_supplier', // не реализовано
      description: 'Может видеть поставщиков'
   },{
      value: 'see_client_balance', // не реализовано
      description: 'Может видеть баланс клиента'
   },{
      value: 'edit_client_balance', // не реализовано
      description: 'Может корректировать баланс клиента'
   },{
      value: 'edit_client', // не реализовано
      description: 'Может редактировать клиента'
   },{
      value: 'delete_client',
      description: 'Может удалять клиента'
   },{
      value: 'recover_client',
      description: 'Может восстанаваливать клиента'
   },{
      value: 'see_client_call', // не реализовано
      description: 'Может видеть звонки'
   },{
      value: 'edit_client_discount', // не реализовано
      description: 'Может редактировать персональную скидку клиента'
   }
]

export const analytic = [
   {
      value: 'indicators', // не реализовано
      description: 'Показатели'
   },{
      value: 'analytic', // не реализовано
      description: 'Аналитический отчет'
   },{
      value: 'assortment', // не реализовано
      description: 'Анализ ассортимента'
   }
]

export const reports = [
   {
      value: 'print_report', // не реализовано
      description: 'Может печатать данные отчета'
   },{
      value: 'report_all_date', // не реализовано
      description: 'Может формировать отчет за произвольный период дат'
   },{
      value: 'report_salary', // не реализовано
      description: 'Отчет по зарплате'
   },{
      value: 'report_all_maney', // не реализовано
      description: 'Всего денег'
   },{
      value: 'report_move_maney', // не реализовано
      description: 'Движение денежных средств'
   },{
      value: 'report_income_orders', // не реализовано
      description: 'Прибыль по заказам'
   },{
      value: 'report_income_sale', // не реализовано
      description: 'Прибыль от продаж'
   },{
      value: 'report_create_order', // не реализовано
      description: 'Созданные заказы'
   },{
      value: 'report_close_order', // не реализовано
      description: 'Закрытые заказы'
   },{
      value: 'report_work_order', // не реализовано
      description: 'Заказы в работе'
   },{
      value: 'report_ad_campaign', // не реализовано
      description: 'Рекламные кампании'
   },{
      value: 'report_engineer', // не реализовано
      description: 'Отчет по исполнителям'
   },{
      value: 'report_service', // не реализовано
      description: 'Отчет по работам и услугам'
   },{
      value: 'report_turnover_goods', // не реализовано
      description: 'Обороты товаров'
   },{
      value: 'report_remaining_warehouse', // не реализовано
      description: 'Остатки на складе'
   },{
      value: 'report_write_of_warehouse', // не реализовано
      description: 'Списания со склада'
   },{
      value: 'report_good_need', // не реализовано
      description: 'Товары, требующие закупки'
   },{
      value: 'report_send_sms', // не реализовано
      description: 'Отправленные SMS'
   },{
      value: 'report_last_sms', // не реализовано
      description: 'Отложенные SMS'
   },{
      value: 'report_reviews', // не реализовано
      description: 'Отзывы клиентов'
   },{
      value: 'report_to_email', // не реализовано
      description: 'Отчет на email'
   },{
      value: 'history_login', // не реализовано
      description: 'История входов'
   },{
      value: 'report_call', // не реализовано
      description: 'Звонки'
   }
]

export const setting = [
   {
      value: 'setting_generally',
      description: 'Общие'
   },{
      value: 'setting_roles',
      description: 'Роли'
   },{
      value: 'setting_employees',
      description: 'Сотрудники'
   },{
      value: 'setting_see_employees',
      description: 'Может видеть удаленных сотрудников'
   },{
      value: 'setting_recover_employees',
      description: 'Может восстанавливать удаленнвх сотрдуников'
   },{
      value: 'setting_branch',
      description: 'Локации'
   },{
      value: 'setting_see_branch',
      description: 'Может видеть удаленные локации'
   },{
      value: 'setting_recover_branch',
      description: 'Может восстанавливать удаленные локации'
   },{
      value: 'setting_warehouse',
      description: 'Склады'
   },{
      value: 'see_setting_tax', // не реализовано
      description: 'Может видеть настройки налогов'
   },{
      value: 'create_tax', // не реализовано
      description: 'Может создавать налоги'
   },{
      value: 'create_tax_rules', // не реализовано
      description: 'Может устанавливать налоговые правила для компании'
   },{
      value: 'setting_status',
      description: 'Статусы'
   },{
      value: 'setting_tags',
      description: 'Теги'
   },{
      value: 'setting_alert',
      description: 'Оповещения'
   },{
      value: 'setting_service',
      description: 'Перечень работ и услуг'
   },{
      value: 'setting_create_service',
      description: 'Может создавать работы и услуги'
   },{
      value: 'setting_see_deleted_service',
      description: 'Может видеть удаленные работы и услуги'
   },{
      value: 'setting_edit_service',
      description: 'Может редактировать услуги'
   },{
      value: 'setting_delete_service',
      description: 'Может удалять работы и услги'
   },{
      value: 'setting_recover_service',
      description: 'Может восстанавливать работы и услги'
   },{
      value: 'setting_book',
      description: 'Справочники'
   },{
      value: 'setting_see_equipment',
      description: 'Может видеть удаленные изделия'
   },{
      value: 'setting_recover_equipment',
      description: 'Может восстанавливать удаленные изделия'
   },{
      value: 'setting_join_equipment',
      description: 'Может объединять изделия'
   },{
      value: 'setting_template',
      description: 'Шаблоны документов'
   },{
      value: 'setting_price',
      description: 'Цены и скидки'
   },{
      value: 'setting_create_price',
      description: 'Может добавлять цены и скидки'
   },{
      value: 'setting_edit_price',
      description: 'Может редактировать цены и скидки'
   },{
      value: 'setting_price_show_deleted',
      description: 'Может видеть удаленные наценки'
   },{
      value: 'setting_price_delete',
      description: 'Может удалять наценки'
   },{
      value: 'setting_price_recover_deleted',
      description: 'Может восстанавливать удаленные наценки'
   },{
      value: 'setting_marketing',
      description: 'Маркетинг'
   }
]

export const permission = [
   {
      permission: generally,
      description: 'Общие'
   },{
      permission: task,
      description: 'Задачи'
   },{
      permission: leads,
      description: 'Обращения'
   },{
      permission: orders,
      description: 'Заказы'
   },{
      permission: sales,
      description: 'Продажи'
   },{
      permission: finance,
      description: 'Финансы'
   },{
      permission: warehouse,
      description: 'Склад'
   },{
      permission: clients,
      description: 'Клиенты'
   },{
      permission: analytic,
      description: 'Аналитика'
   },{
      permission: reports,
      description: 'Отчеты'
   },{
      permission: setting,
      description: 'Настройки'
   }
]
