import React, { useState, useEffect } from 'react'


import { showDate } from './utils'

import Icon from './Icon'
import { icon_calendar } from '../../data/icons'

const ChooseDate = (props) => {

   const [current_date, setCurrent_day] = useState(new Date) 
   const [visibleListMonth, setVisibleListMonth] = useState(false)
   const [visibleInputYear, setVisibleInputYear] = useState(false)
   const [visibleCalendar, setVisibleCalendar] = useState(false)

   const clickHandel = (event) => {
      if (!event.path.map(el => el.id).includes(`monthList`) ) {
         if (visibleListMonth) {
            setVisibleListMonth(false)
      }}
      if (!event.path.map(el => el.id).includes(`calendar`) ) {
         if (visibleCalendar) {
            setVisibleCalendar(false)
      }}
   }
   
   useEffect(() => {
   window.addEventListener('click', clickHandel)
   return () => {
      window.removeEventListener('click', clickHandel)
   }
   })

   const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
   const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

   let first = new Date(current_date)
   // first.setHours(0, 0, 0, 0)
   first.setDate(1)
   first.setTime(first.getTime() - (first.getDay() || 7)*24*60*60*1000)
   

   let current_days = []
   for (let i=0; i<42; i++) {
      current_days[i] = new Date(first.getTime() + 24*60*60*1000)
      first.setTime(first.getTime() + 24*60*60*1000)
   }

   const compareDates = (date1, date2) => {
      return   date1.getDate() === date2.getDate() && 
               date1.getMonth() === date2.getMonth() && 
               date1.getFullYear() === date2.getFullYear()
   }

   const handleInputYear = (value) => {
      let out = value.replace(/[^0-9]/g, '')
      if (value > 9999) out = 9999
      if (value < 0) out = 0
      setCurrent_day(new Date(current_date.setFullYear(out)))
   }

   return (
      <div>
         <div 
            className='dateContaner'
            onClick={() => setVisibleCalendar(true)}
         >
            <Icon 
               className='icon-s2 mlr5'
               icon={icon_calendar}
               color='gray'
            />
            <div>{showDate(props.current_date/1000)}</div>
         </div>

         {visibleCalendar && !props.disabled ? 
         <div className='calendar' id='calendar'>

            <div className='calendarNavi'>
               <div 
                  className='nextB'
                  onClick={() => setCurrent_day(new Date(current_date.setMonth(current_date.getMonth() - 1)))}
               >
                  {'<'}
               </div>

               <div className='row'>
                  <div 
                     className='currMonth'
                     onClick={() => setVisibleListMonth(!visibleListMonth)}
                  >
                     <div>{months[current_date.getMonth()]}</div><div className='gu'>&#6662;</div>
                  </div>

                  {visibleInputYear ? 
                  <input
                     className='optionFilterInput w30'
                     autoFocus
                     onChange={event => handleInputYear(event.target.value)}
                     value={current_date.getFullYear()}
                     onBlur={() => setVisibleInputYear(false)}
                  /> :
                  <div 
                     className='pd5'
                     onDoubleClick={() => setVisibleInputYear(true)}
                  >
                     {current_date.getFullYear()}
                  </div>}
                  <div className='nextY'>
                     <div 
                        className='gy'
                        onClick={() => setCurrent_day(new Date(current_date.setFullYear(current_date.getFullYear() + 1)))}
                     >
                        &#9650;
                     </div>
                     <div 
                        className='gy'
                        onClick={() => setCurrent_day(new Date(current_date.setFullYear(current_date.getFullYear() - 1)))}
                     >
                        &#9660;
                     </div>
                  </div>
               </div>
               <div 
                  className='nextB'
                  onClick={() => setCurrent_day(new Date(current_date.setMonth(current_date.getMonth() + 1)))}
               >
                  {'>'}
               </div>
            </div>
           { visibleListMonth ?
           <div className='monthList' id='monthList'>
               {months.map((month, idx) => (
                  <div 
                     key={idx}
                     className='month'
                     onClick={() => {
                        setCurrent_day(new Date(current_date.setMonth(idx)))
                        setVisibleListMonth(!visibleListMonth)
                     }}
                  >
                     {month}
                  </div>
                     ))}
            </div> : null}

            <div className='row'>
               {weekDays.map((day, idx) => (
                  <div 
                     key={idx}
                     className='calendarWeekDay'
                  >
                     {day}
                  </div>
               ))}
            </div>

            <div className='calendarDays'>
               {current_days.map((day, idx) => (
                  <div 
                     key={idx}
                     className={`calendarDay 
                        ${compareDates(new Date(props.current_date), day) ? 'settedDay' : null}
                     `}
                     style={{
                        color: day.getMonth() === current_date.getMonth() ? null : '#aaaaaa'
                     }}
                     onClick={() => {
                        props.func(day)
                        setCurrent_day(new Date(day))
                     }}
                  >
                     {day.getDate()}
                  </div>
               ))}
            </div>

            <div className='calandarTime'>
               <div className='mtime'>
                  <div className='hsm'>{new Date(props.current_date).getHours()}</div>
                  <div className='ssm'>
                     <div 
                        onClick={() => props.func(new Date(props.current_date).setHours(new Date(props.current_date).getHours() + 1))}
                     >
                        &#9650;
                     </div>
                     <div 
                        onClick={() => props.func(new Date(props.current_date).setHours(new Date(props.current_date).getHours() - 1))}
                     >
                        &#9660;
                     </div>
                  </div>
               </div>:
               <div className='mtime'>
                  <div className='hsm'>{new Date(props.current_date).getMinutes()}</div>
                  <div className='ssm'>
                  <div 
                        onClick={() => props.func(new Date(props.current_date).setMinutes(new Date(props.current_date).getMinutes() + 1))}
                     >
                        &#9650;
                     </div>
                     <div 
                        onClick={() => props.func(new Date(props.current_date).setMinutes(new Date(props.current_date).getMinutes() - 1))}
                     >
                        &#9660;
                     </div>
                  </div>
               </div>
            </div>
         </div> : null }

      </div>
   )
}

 export default ChooseDate