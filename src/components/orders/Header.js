import React from 'react';
import { connect } from 'react-redux';
import { changeFilterAction } from '../../Redux/actions'

function Header({changeFilter, search_word}) {

   

    const handleChange = (event) => {
        event.preventDefault()
        changeFilter(event.target.value) 
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
                        value = {search_word}
                        />
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    search_word: state.data.search_word
})

const mapDispatchToProps = {
    changeFilter: changeFilterAction
}

export default connect(mapStateToProps, mapDispatchToProps) (Header)