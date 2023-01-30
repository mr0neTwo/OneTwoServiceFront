import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {addEquipment, addDictMalfunction, addDictPackagelist, addItemPayments} from '../../../../Redux/actions'
import {changeBookState} from '../../../../Redux/actions/bookActions'
import BookEquipment from './BookEquipment'
import MalfunctionBooks from './MalfunctionBooks'
import PackagelistBook from './PackagelistBook'
import Tabs from '../../../general/Tabs'
import ItemPayments from './ItemPayments'

const SettingBooks = (props) => {

    useEffect(() => {
        props.addEquipment()
        props.addDictMalfunction()
        props.addDictPackagelist()
        props.addItemPayments()
    }, [])

    const tabs_list = ['Изделия', 'Неисправности', 'Комплектация', 'Статьи ДДС']

    return (
        <div className='settingContent'>

            <div className='header'>
                <span className='headerTitle'>Справочники</span>
            </div>
            <div className='settingPageBody'>
            </div>

            <Tabs
                list={tabs_list}
                func={idx => props.changeBookState({tabs: idx})}
                tab={props.tabs}
            />
            {props.tabs === 0 ? <BookEquipment/> : null}
            {props.tabs === 1 ? <MalfunctionBooks/> : null}
            {props.tabs === 2 ? <PackagelistBook/> : null}
            {props.tabs === 3 ? <ItemPayments/> : null}


        </div>

    )
}

const mapStateToProps = state => ({
    tabs: state.book.tabs

})

const mapDispatchToProps = {
    changeBookState,
    addEquipment,
    addDictMalfunction,
    addDictPackagelist,
    addItemPayments
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingBooks)