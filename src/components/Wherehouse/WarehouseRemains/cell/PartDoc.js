import React from 'react'

const PartDoc = (props) => {

    const doc_url = props.remain ? props.remain.doc_url : props.part.doc_url

    if (doc_url) {
        return (
            <td>
                <a
                    href={`${process.env.PUBLIC_URL}/${doc_url}`}
                    target='_blank'
                >
                    {doc_url.split('/').pop().split('_')[1]}
                </a>
            </td>
        )
    } else {
        return <td/>
    }

}

export default PartDoc