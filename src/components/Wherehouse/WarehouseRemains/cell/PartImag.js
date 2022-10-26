import React from 'react'

const PartImag = (props) => {

    const image_url = props.remain ? props.remain.image_url : props.part.image_url
    const title = props.remain ? props.remain.title : props.part.title

    if (image_url) {
        return (
            <td>
                <img
                    className='remTabImg'
                    src={`${process.env.PUBLIC_URL}/${image_url}`}
                    alt={`Изображение ${title}`}
                />
            </td>
        )
    } else {
        return <td/>
    }

}

export default PartImag