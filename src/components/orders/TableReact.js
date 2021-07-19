import React from 'react'
import { useMemo } from 'react'
import { useTable } from 'react-table'
import { connect } from 'react-redux'




 

 


 function TableReact({orders}) {

   // const arraYOrders = orders.slice(0, 50).map(order => 
   //    ({
   //    col1: order.id_label,
   //    col2: order.created_at,
   //    col3: order.kindof_good,
   //    col4: order.malfunction,
   //    сol5: order.client.name
   //    })
   // )

   const data = useMemo(
      () => orders,
      []
    )


    const columns = useMemo(
      () => [
        {
          Header: 'Заказ №',
          accessor: 'id_label', 
        },
        {
          Header: 'Создан',
          accessor: 'created_at',
        },
        {
         Header: 'Тип устройства',
         accessor: 'kindof_good',
       },
       {
         Header: 'Неисправность',
         accessor: 'malfunction',
       },
       {
         Header: 'Клиент',
         accessor: 'client.name',
       }

      ],
      []
    )












    const tableInstance = useTable({ columns, data })


    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance

   return (
      // apply the table props
      <table {...getTableProps()}>
        <thead>
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
 }

 const mapStateToProps = (state) => {
   return {
     orders: state.data.orders,
   }
}




 export default connect(mapStateToProps, null) (TableReact);