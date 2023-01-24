import React, {useState} from 'react'
import { connect } from 'react-redux'

import { changeVisibleState } from '../../Redux/actions'
import PropTypes from "prop-types";


/**
 *
 * className='className' // Класс оболочки
 *
 * title='Наименование' // Наименование поля
 *
 * onChange={event => console.log(event.target.value)} // Функция изменения
 *
 * value={props.value} // Значение
 *
 * disabled={false} // Заблокировать
 *
 * checkedFlag='flagname' // Имя флага для проверки
 *
 * checked={props.statusChecked} // Флаг проверки
 *
 * redStar={true} // Добавить красную звездочку к наименованию поля
 *
 * errorMassage='errorMassage' // Ошибка при непройденой проверки
 *
 * @returns {JSX.Element}
 */
const LableArea = (props) => {

    const [focus, setFocus] = useState(false)

    const handleBlur = (event) => {
        if (props.checkedFlag) props.changeVisibleState({[props.checkedFlag]: !!event.target.value})
        setFocus(false)
    }

   return (
      <div
          className={`
              input-label ${props.className} 
              ${focus ? 'input-label_focus' : ''} 
              ${props.checkedFlag && !props.checked ? 'input-label_error' : ''}
          `}
      >
          <div className='label input-label__label'>
              {props.title}
              {props.redStar ? <span className={props.value ? '' : 'input-label__red-star'}>*</span> : null}
          </div>
            <textarea 
               className='textarea'
               autoFocus={props.autoFocus}
               onChange={props.onChange}
               value={props.value}
               onFocus={() => setFocus(true)}
               onBlur={handleBlur}
               disabled={props.disabled}
            />
      </div>
   )
}

LableArea.propTypes ={
    className: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    checkedFlag: PropTypes.string,
    checked: PropTypes.bool,
    redStar: PropTypes.bool,
    errorMassage: PropTypes.string
}

const mapStateToProps = state => ({
   // checked: state.view[props.checkedFlag]
   })

const mapDispatchToProps = {
    changeVisibleState
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(LableArea)

// className=''
// title=''
// onChange={}
// value={}
// disabled={}
// checkedFlag={}
// checked={}
// redStar={}
// errorMassage=''