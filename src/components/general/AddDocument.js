import React, {useState} from 'react'

const AddDocument = (props) => {

    const name = props.url ? props.url.split('/').pop() : ''

    const [fileName, setFileName] = useState(name)

    const fileHandler = event => {
        let reader = new FileReader()
        reader.onload = function (e) {
            props.onChange(e.target.result)
        }
        reader.readAsDataURL(event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    return (

        <div className={`add-doc ${props.className || ''}`}>
            {props.value ?
                <div className='nowrap w130'>{fileName}</div>
                : (props.url ?
                    <a
                        className='nowrap w130'
                        href={`${process.env.PUBLIC_URL}/${props.url}`}
                    >
                        Datasheet.pdf
                    </a>
                    : null)
            }
            <label className="bt bt_med bt_primary">

                <div className=''>
                    {props.value || props.url ? 'Изменить файл' : 'Добавить файл'}
                </div>

                <input
                    type='file'
                    accept='application/pdf'
                    onChange={fileHandler}
                    disabled={props.disabled}
                />
            </label>


        </div>
    )
}


export default AddDocument