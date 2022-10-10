import React from 'react'
import { connect } from 'react-redux'
import Checkbox from '../../../general/Checkbox'

const Analytics = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th className='w15'></th>
                    <th>Касса</th>
                    <th>Права</th>
                </tr>
            </thead>
                <tbody>
                {props.cashboxes.map(caschbox => (
                    <tr key={caschbox.id}>
                        <td>
                            <Checkbox
                                onChange={event => console.log(event.target.checked)}
                            />
                        </td>
                        <td>{caschbox.title}</td>
                        <td></td>
                    </tr>
                ))}
                </tbody>
        </table>
    )
}

const mapStateToProps = state => ({
    cashboxes: state.cashbox.cashboxes
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)