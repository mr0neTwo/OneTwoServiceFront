import React from 'react'

/**
 *
 *
 * className='' // класс оболочки
 *
 * title='Добавить изображение'
 *
 * url={image_url} // ссылка на загуженную картинку на сервер
 *
 * onChange={file => props.someFunction(file)} // функция обработки загруженного изображения
 *
 * value={props.part.img} // только что загруженное изображение (хранящееся в state)
 *
 * disabled={false}
 *
 *
 * @returns {JSX.Element}
 *
 */

const AddPicture = (props) => {

    const fileHandler = event => {
        let reader = new FileReader()
        reader.onload = function (e) {
            props.onChange(e.target.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }
    return (

        <div className={`add-picture ${props.className || ''}`}>

            <div className={props.value || props.url ? 'add-picture__show' : 'add-picture__add'}>

                <label className="add-picture__label">
                    {props.value || props.url ?
                        <img
                            src={props.value || `${process.env.PUBLIC_URL}/${props.url}`}
                            alt={'Изображение'}
                        />
                        :
                        <i>Добавить изображение</i>
                    }
                    <input
                        type='file'
                        accept="image/*"
                        onChange={fileHandler}
                        disabled={props.disabled}
                    />
                </label>

            </div>
        </div>
    )
}


export default AddPicture