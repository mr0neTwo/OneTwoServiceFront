import React from 'react';


function Header() {
    return (
        <div className = 'Header'>
            <div className = 'headerTitle'>Заказы</div>
            <div className = 'imputSearch'>
                <form>
                    <input 
                        name = 'search' 
                        className = 'imputSearchForm' 
                        defaultValue = 'Минимум 3 символа'
                        />
                </form>
            </div>
        </div>
    )
}

export default Header;