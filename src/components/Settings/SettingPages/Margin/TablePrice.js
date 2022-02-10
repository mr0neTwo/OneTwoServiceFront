
import React from 'react'
import { connect } from 'react-redux'

import { editPrice, setVisibleFlag } from '../../../../Redux/actions'


function TablePrice(props) {

   const list_margin = props.discount_margin.filter(margin => (!margin.deleted | props.showDeleted) && margin.margin_type === props.type)

   return (
      <>
      <table>
         <thead>
            <tr>
               <th>Наименование</th>
               <th className='w150'>Наценка/Скидка</th>
            </tr>
         </thead>
         <tbody>
            {list_margin.map(margin => {
               return (
               <tr 
                  key={margin.id}
                  className={margin.deleted ? 'rowDeleted' : null}
                  onDoubleClick={props.permissions.includes('setting_edit_price') ? () => {
                     props.editPrice(margin)
                     props.setVisibleFlag('statusPriceEditor', true)
                  } : null}
               >
                  <td>{margin.title}</td>
                  <td>{margin.margin}</td>
               </tr>
               )
            })}
         </tbody>
      </table>
      <div>Всего - {list_margin.length}</div>
      </>
   )}

const mapStateToProps = state => ({
   discount_margin: state.data.discount_margin,
   permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
   editPrice,
   setVisibleFlag
}

export default connect (mapStateToProps, mapDispatchToProps) (TablePrice)