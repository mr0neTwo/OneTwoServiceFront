import React, {useState} from 'react';
import { connect } from 'react-redux';
import { changeFilterAction } from '../../Redux/actions'

function Header({changeFilter, search_word}) {

   const [search, setSearch] = useState('')

    const handleSearch = (event) => {
        if (event.key !== 'Enter') return
        event.preventDefault()
        if (event.key === 'Enter') changeFilter(search)
    }

    

    return (
        <div className = 'Header'>
            <div className = 'headerTitle'>Заказы</div>
            <div className = 'imputSearch'>
                <form>
                    <input 
                        className = 'imputSearchForm' 
                        placeholder = 'Минимум 3 символа'
                        onChange={event => setSearch(event.target.value)}
                        onKeyPressCapture={event => handleSearch(event)}
                        value = {search}
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