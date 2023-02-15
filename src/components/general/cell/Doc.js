import React from 'react'

/**
 *
 * @example
 * <Doc doc_url={props.doc_url}/>
 */
const Doc = (props) => {


    if (props.doc_url) {
        return (
            <td>
                <div className='cell'>
                    <a
                        href={`${process.env.PUBLIC_URL}/${props.doc_url}`}
                        target='_blank'
                    >
                        {props.doc_url.split('/').pop().split('_')[1]}
                    </a>
                </div>
            </td>
        )
    } else {
        return <td/>
    }
}

export default Doc