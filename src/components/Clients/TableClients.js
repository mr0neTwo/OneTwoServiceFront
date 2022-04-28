import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { useTable } from 'react-table'
import {addClients} from '../../Redux/actions/clientAction'
import {showPhone} from '../general/utils'

const TableClients = props => {

    useEffect(() => {
        props.addClients()
    }, [props.client.filter_name, props.client.filter_phone])

    const data = React.useMemo(
        () => props.client.clients.map(client => ({
            name: client.name,
            phone: client.phone.length ? showPhone(client.phone[0].number) : '',
            name_doc: client.name_doc,
            email: client.email,
            address: client.address,
            notes: client.notes
        })),
        [props.client.clients]
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Имя',
                accessor: 'name',
            },
            {
                Header: 'Телефон',
                accessor: 'phone',
            },
            {
                Header: 'Обращение',
                accessor: 'name_doc',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Адресс',
                accessor: 'address',
            },
            {
                Header: 'Комментарий',
                accessor: 'notes',
            },
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

const mapStateToProps = state => ({
    client: state.client
})

const mapDispatchToProps = {
    addClients
}

export default connect(mapStateToProps, mapDispatchToProps)(TableClients)