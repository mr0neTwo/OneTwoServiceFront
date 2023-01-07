import React, { useEffect, useRef} from 'react'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'

import { chooseBookSelected } from '../../../../Redux/actions/bookActions'
import Checkbox from '../../../general/Checkbox'
import { ICON } from '../../../../data/icons'

const DictTable = (props) => {

   const mainCheckbox = useRef()
  
   useEffect(() => {
      const values = props.list.filter(el => props.selected.includes(el.id))
      if (values.length === props.list.length) {
         mainCheckbox.current.indeterminate = false
         mainCheckbox.current.checked = true
      } else if (!values.length) {
         mainCheckbox.current.indeterminate = false
         mainCheckbox.current.checked = false
      } else {
         mainCheckbox.current.indeterminate = true
      }
   }, [props.selected])

   return (
      <div>
         <h4 className="mt15">{props.title}</h4>
         <p>{props.description}</p>

         <div className='row'>

            <div className='greenButton' onClick={ props.addElement }>
               + Элемент
            </div>
            {props.selected.length ? 
            <div className='row'>
               <div className="whiteButton simbolBotton" onClick={props.delete}>
                  <svg className="icon-table-red-basket" viewBox="0 0 32 32">
                     <path d={ICON.TRASH} />
                  </svg>
               </div>
               <div>Выбрано - {props.selected.length}</div>
            </div> : null }
         </div>
         <div className='tableElement'>
         <table>
               <thead>
                  <tr>
                     <th>
                        <div className='checkbox'>
                           <input 
                           ref={mainCheckbox}
                           type='checkbox' 
                           onChange={() => props.chooseBookSelected(props.list.map(el => el.id), props.selected_field)}
                           />
                           <label></label>
                        </div>
                     </th>
                     <th className='wm500'>{props.title}</th>
                     <th className='wm50'>{props.title2 ? props.title2 : 'Частота'}</th>
                  </tr>
               </thead>
               <tbody>
                  {props.list.map(element => (
                     <tr key={element.id}>
                        <td className='w30'>
                           <Checkbox
                              onChange={() => props.chooseBookSelected([element.id], props.selected_field)}
                              checked={props.selected.includes(element.id)}
                           />
                        </td>
                        <td>{element.title}</td>
                        <td>
                           {element.count}
                           {element.direction === 1 ? <div className='redDirection'>Расход</div> : null}
                           {element.direction === 2 ? <div className='greenDirection'>Приход</div> : null}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            </div>
            <ReactPaginate
               pageCount={ props.count % 20 > 0 ? ( props.count / 20 ) :  props.count / 20 - 1} 
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={ props.onPageChange }
               forcePage={ props.page }
               previousLabel={'<'}
               nextLabel={'>'}
               breakLabel={'...'}
               breakClassName={'pages-pagination'}
               containerClassName={'pagination'}
               pageClassName={'pages-pagination'}
               activeClassName={'active'}
               nextClassName={'pages-pagination'}
               previousClassName={'pages-pagination'}
            />
            <div>Всего - {props.count}</div>
          </div>
   )
}

const mapStateToProps = state => ({
   
   })

const mapDispatchToProps = {
   chooseBookSelected
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(DictTable)