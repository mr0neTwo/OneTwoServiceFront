import React, {useState} from 'react'

const BoxVariable = props => {

    const [listVisible, setListVisible] = useState(false)

    return (
        <div className='boxVariable'>
            <div
                className='varLabel mr-tb-15 w200'
                onClick={() => setListVisible(!listVisible)}
            >
                {props.title}
            </div>
            {listVisible ?
                <div>
                    {props.list_var.map((variable, idx) => (
                        <div
                            key={idx}
                            className='variableItem'
                            onClick={() => props.func(variable)}
                        >
                            {variable}
                        </div>
                    ))}
                </div>
                : null
            }
        </div>
    )
}


export default BoxVariable