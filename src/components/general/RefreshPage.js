import React from 'react'
import Button from './Button'


const RefreshPage = (props) => {

    const refreshPage = () =>{
        window.location.reload()
    }

    return (
        <div className='centerBlockFix'>
            <div className='blockWindowFix wmx750 wmn750 al-itm-ct'>
                <div className='createNewTitle'>Время сесси истекло, перезагрузите страницу</div>
                <div className='jc-c m30'>
                    <Button
                        className='greenButton'
                        title='Перезагрузить'
                        onClick={refreshPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default RefreshPage