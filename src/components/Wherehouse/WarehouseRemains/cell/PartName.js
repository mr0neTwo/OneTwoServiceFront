import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const PartName = (props) => {

    const location = useLocation()

    const part_id = props.remain ? props.remain.part_id : props.part.id
    const title = props.remain ?props.remain[props.header.field] : props.part.title

    return (
        <td>
            <Link
                className='partLink'
                to={{
                    pathname: `/warehouse/part${part_id}`,
                    state: {
                        remain: props.remain,
                        prevPath: location.pathname
                    }
                }}
            >
                <span>{title}</span>
            </Link>
        </td>

    )
}

export default PartName