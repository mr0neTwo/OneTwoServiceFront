import {task, leads, orders, sales, finance, warehouse, setting, clients, analytic, reports} from './permissions'
import {ICON} from './icons'

export const Nav = {
    Main: [
        {
            id: 1,
            title: 'Задачи',
            icon: ICON.CLIPBOARD,
            url: '/tasks',
            permission_keys: task.map(per => per.value)
        // }, {
        //     id: 2,
        //     title: 'Обращения',
        //     icon: ICON.FILTER_LIST,
        //     url: '/leans',
        //     permission_keys: leads.map(per => per.value)
        }, {
            id: 3,
            title: 'Заказы',
            icon: ICON.ORDERS,
            url: '/orders',
            permission_keys: orders.map(per => per.value)
        }, {
            id: 4,
            title: 'Продажи',
            icon: ICON.CART,
            url: '/shops',
            permission_keys: sales.map(per => per.value)
        }, {
            id: 5,
            title: 'Финансы',
            icon: ICON.COIN_DOLLAR,
            url: '/payments',
            permission_keys: finance.map(per => per.value)
        }, {
            id: 6,
            title: 'Склад',
            icon: ICON.INBOXES,
            url: '/warehouse',
            permission_keys: warehouse.map(per => per.value)
        }, {
            id: 7,
            title: 'Клиенты',
            icon: ICON.USERS,
            url: '/clients',
            permission_keys: clients.map(per => per.value)
        }
    ],
    Second: [
        {
            id: 8,
            title: 'Аналитика',
            icon: ICON.STATS_DOCS,
            url: 'analytics',
            permission_keys: analytic.map(per => per.value)
        }, {
            id: 9,
            title: 'Отчеты',
            icon: ICON.FILE_TEXT,
            url: '/reports',
            permission_keys: reports.map(per => per.value)
        }
    ],
    Third: [
        {
            id: 10,
            title: 'Настройки',
            icon: ICON.COG,
            url: '/settings',
            permission_keys: setting.map(per => per.value)
        }
    ]
}

// export const data_menu_rows =


