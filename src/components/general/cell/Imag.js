import React from 'react'

/**
 *
 * @example
 * <Imag
 *   image_url={part.image_url}
 *   title={part.title}
 * />
 *
 * image_url - url изображения
 * title - альтернативная подпись
 */
const Imag = (props) => {

    if (!props.image_url) return <td/>

    return (
        <td>
            <div className='cell'>
                <img
                    src={`${process.env.PUBLIC_URL}/${props.image_url}`}
                    alt={`Изображение ${props.title || ''}`}
                />
            </div>
        </td>
    )
}

export default Imag