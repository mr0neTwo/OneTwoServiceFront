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

        <div className={props.className}>
            <div className='lableImput'>{props.title}</div>

            <div className='row'>
                {props.value ?
                    <div className='noWr w150'>{fileName}</div>
                    : (props.url ?
                        <a
                            className='noWr w150'
                            href={`${process.env.PUBLIC_URL}/${props.url}`}
                            target='_blank'
                        >
                            Datasheet.pdf
                        </a>
                        : null)
                }
                    <label className="label">

                        {props.value || props.url ?
                            <div className='whiteBlueBotton'>Изменить файл</div>
                            :
                            <div className='whiteBlueBotton'>Добавить файл</div>
                        }

                        <input
                            className='addDoc'
                            type='file'
                            accept='application/pdf'
                            onChange={fileHandler}
                            disabled={props.disabled}
                        />
                    </label>

            </div>
        </div>
    )
}



export default AddDocument