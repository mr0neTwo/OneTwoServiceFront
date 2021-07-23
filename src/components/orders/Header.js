import React, { useRef } from 'react';


function Header({oderSearch}) {

   

    const handleChange = (event) => {
        oderSearch(event.target.value)
    }

    return (
        <div className = 'Header'>
            <div className = 'headerTitle'>Заказы</div>
            <div className = 'imputSearch'>
                <form>
                    <input 
                        className = 'imputSearchForm' 
                        placeholder = 'Минимум 3 символа'
                        onChange = {handleChange}
                        />
                </form>
            </div>
        </div>
    )
}

export default Header;