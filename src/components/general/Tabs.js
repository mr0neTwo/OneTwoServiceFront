import React from 'react'
import PropTypes from "prop-types";


/**
 *
 * className='className' // Класс оболочки
 *
 * list={['tab1', 'tab2', 'tab3']} // Список имен вкладок
 *
 * contents={[<Component1/>, <Component2/>, <Component3/>]}
 *
 * tab={props.tab} // Поле с номером текущей вкладки
 *
 * func={() => console.log('set tab')} // Функция изменения номера текущей вкладки
 *
 * tab_field='tab_field' // Назавние поля текущей вкладки (default='tabs')
 *
 * @returns {JSX.Element}
 */
const Tabs = (props) => {
    return (
            <div className={`tabs ${props.className}`}>
                {props.list.map((tab, idx) => (
                    <div
                        key={idx}
                        className={props.tab === idx ? 'tabOn' : 'tab'}
                        onClick={() => props.func(idx)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

    )
}

Tabs.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
    tab: PropTypes.number,
    func: PropTypes.func,
    tab_field: PropTypes.string
}

export default Tabs

// className=''
// list=['tab1', 'tab2', 'tab3']
// tab={props.tab}
// func={() => console.log('set tab')}
// tab_field='tab_field' default 'tabs'
