import React from 'react'
import { connect } from 'react-redux'

import { setVisibleFlag } from '../../Redux/actions'
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

   return (
      <div className={props.className}>
            <div className='lableImput'>{props.title}{props.redStar ? <span className='redStar'>*</span> : null}</div>
            <textarea 
               className='textInput'
               name={props.name}
               onChange={props.onChange}
               value={props.value}
               onBlur={props.checkedFlag ? event => props.setVisibleFlag(props.checkedFlag, !!event.target.value) : null}
               style={props.checkedFlag && !props.checked  ? {borderColor: 'red'} : null}
               disabled={props.disabled}
            />
         {props.checkedFlag && !props.checked ? <div className='errorMassageInput'>{props.errorMassage ? props.errorMassage : 'Необходимо заполнить'}</div> : null}
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
   setVisibleFlag
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