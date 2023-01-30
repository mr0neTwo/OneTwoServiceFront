import React, {useEffect, useState} from 'react'

import Icon from './Icon'
import {ICON} from '../../data/icons'

/**
 * Паганиция
 * @component
 * @example
 * <Paginate
 * allItems={props.count}
 * onPage={50}
 * count={2}
 * count_start_end={2}
 * func={page => console.loge(page)}
 * />
 *
 * allItems - всего элементов
 * onPage - елеменов на странице
 * count - количество страниц отображаемое рядом с активной станицей
 * count_start_end - количество страници отображемое в начале и конце списка
 * navigation - отображать кнопки навигации
 * func - функция возвращающая номар выбраной страницы
 */

const Paginate = (props) => {

   // Состояния для актвной странцы
   const [active, setActive] = useState(1)

   useEffect(() => {
      setActive(1)
   }, [props.allItems])

   // посчитаем количество страниц
   const pages = (props.allItems % props.onPage) > 0 ? 
   (props.allItems - props.allItems % props.onPage)/props.onPage + 1 :
   (props.allItems - props.allItems % props.onPage)/props.onPage 

   // создадим список для станиц
   let list_pages = []

   // заполним список номерами начиная с 1
   for (let i = 0; i < pages; i++) {
      list_pages[i] = i + 1;
   }

   // Функция для выбора отображения номеров страниц
   const choosePage = (page) => {
      // если номер совпадаетс с активным отображаем
      if (page === active) return page
      // если номер больше или меньнше на count отображаем
      if (Math.abs(active - page) < props.count) return page
      // если разница между активными равна count отображаем троеточие
      if (Math.abs(active - page) === props.count) return '...'
      
      // отображаем count_start_end страниц в начале и конце списка
      for (let i=0; i < props.count_start_end; i++) {
         if (page === list_pages[i]) return page
         if (page === list_pages[list_pages.length-1-i]) return page
      }
   }

   // функция выбора показывать номер сраници или нет 
   const isShow = (page) => {
      // если попадает в диапазон count показываем
      if ((Math.abs(active - page) <= props.count)) return true
      
      // показываем count_start_end страниц в начале и конце списка
      for (let i=0; i < props.count_start_end; i++) {
         if (page === list_pages[i]) return page
         if (page === list_pages[list_pages.length-1-i]) return page
      }
      return false
   }

   // функция делает страницу активной и отдает значение внешней функции
   const handleClick = (page) => {
      setActive(page)
      props.func(page)
   }

   return (
      <div className='pagination'>
         {/* Если флаг навигации есть отображаем кнопки навигации */}
         {props.navigation ? 
         <div 
            className='pagination__arrow'
            onClick={() => handleClick(active-1 < 1 ? active : active - 1)}
         >
            <Icon
                className='icon'
                icon={ICON.LEFT}
                color={active === 1 ? 'var(--secondary)' : 'var(--action-accent)'}
            />
         </div> : null}
         {/* Отрисовываем елементы списка страниц  */}
         {list_pages.map(page => {
            return isShow(page) ? (    // проверяем условие для показа
            <div
               key={page}
               className={active === page ? 'pagination__active' :'pagination__page'} // если страница активна меняем стиль отображения
               onClick={() => handleClick(page)}
            >
               {choosePage(page)} {/* Вычисляме значения для отрисовки */}
            </div>
         ) : null
         })}
         {/* Если флаг навигации ессть отображаем кнопки навигации */}
         {props.navigation ? 
         <div className='arrow' onClick={() => handleClick(active+1 > list_pages.length ? active : active+1)}>
            <Icon
                className='icon'
                icon={ICON.RIGHT}
                color={active === pages ? 'var(--secondary)' : 'var(--action-accent)'}
            />
         </div> : null}
         <div className='pagination__title'>Всего - {props.allItems}</div>
      </div>
   )
}

 export default Paginate