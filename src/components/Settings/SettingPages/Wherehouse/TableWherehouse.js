import React from 'react'
import { connect } from 'react-redux'

const TableWherehouse = (props) => {
   return (
      <table>
         <thead>
            <tr>
               <th className=''></th>
               <th className=''>Название</th>
               <th className=''>Описание</th>
            </tr>
         </thead>
      </table>
   )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}
  
 export default connect(mapStateToProps, mapDispatchToProps)(TableWherehouse)