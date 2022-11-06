import React, { useState } from 'react'

/**
 *
 * allItems={props.list}
 *
 * onPage={50}
 *
 * count={2}
 *
 * count_start_end={2}
 *
 * navigation={true}
 *
 * func={page => console.loge(page)}
 *
 */

const Paginate = (props) => {

   // Состояния для актвной странцы
   const [active, setActive] = useState(1)

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
      if (page == active) return page
      // если номер боьше или меньнше на count отображаем
      if (Math.abs(active - page) < props.count) return page
      // если разница между активными равна count отображаем троеточие
      if (Math.abs(active - page) == props.count) return '...'
      
      // отображаем count_start_end страниц в начале и конце списка
      for (let i=0; i < props.count_start_end; i++) {
         if (page == list_pages[i]) return page
         if (page == list_pages[list_pages.length-1-i]) return page
      }
   }

   // функция выбора показывать номер сраници или нет 
   const isShow = (page) => {
      // если попадает в диапазон count показываем
      if ((Math.abs(active - page) <= props.count)) return true
      
      // показываем count_start_end страниц в начале и конце списка
      for (let i=0; i < props.count_start_end; i++) {
         if (page == list_pages[i]) return page
         if (page == list_pages[list_pages.length-1-i]) return page
      }
      return false
   }

   // функция делает страницу активной и отдает значение внешней функции
   const handleClick = (page) => {
      setActive(page)
      props.func(page)
   }

   return (
      <div className = 'row'>
         {/* Если флаг навигации ессть отображаем кнопки навигации */}
         {props.navigation ? 
         <div 
            className='pages-pagination' 
            onClick={() => handleClick(active-1 < 1 ? active : active - 1)}
         >
            {'<'}
         </div> : null}
         {/* Отрисовываем елементы списка страниц  */}
         {list_pages.map(page => {
            return isShow(page) ? (    // проверяем условие для показа
            <div
               key={page}
               className={active == page ? 'active' :'pages-pagination'} // если страница активна меняем стиль отображения
               onClick={() => handleClick(page)}
            >
               {choosePage(page)} {/* Вычисляме значения для отрисовки */}
            </div>
         ) : null
         })}
         {/* Если флаг навигации ессть отображаем кнопки навигации */}
         {props.navigation ? 
         <div className='pages-pagination' onClick={() => handleClick(active+1 > list_pages.length ? active : active+1)}>
            {'>'}
         </div> : null}
      </div>
   )
}

 export default Paginate

 // allItems={100}      // всего элементов
 // onPage={20}         // елеменов на странице
 // count={3}           // количество страниц отображаемое рядом с октивной станицей
 // count_start_end={2} // количество страници отображемое в начале и конце списка
 // navigation={true}   // отображать кнопки навигации