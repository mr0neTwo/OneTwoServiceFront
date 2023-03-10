import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {changeBookForm, chooseBookSelected} from '../../../../Redux/actions/bookActions'
import {ICON} from '../../../../data/icons'

import Icon from '../../../general/Icon'


const JoinEquipmets = props => {
    const [listVisible, setlistVisible] = useState(false)

    const clickHandel = event => {
        if (
            !event.composedPath().map((el) => el.id).includes('setEquipment') &&
            !event.composedPath().map((el) => el.id).includes('listSetEquipments')
        ) {
            if (listVisible) {
                setlistVisible(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const listFilter = ['filter_type', 'filter_brand', 'filter_subtype', 'filter_model']
    const listData = ['equipment_types', 'equipment_brands', 'equipment_subtypes', 'equipment_models']
    const listPage = ['page_type', 'page_brand', 'page_subtype', 'page_model']

    const listEquipment = props.book[listData[props.book.type]]
        .filter(equipment => !equipment.deleted)
        .filter(equipment => equipment.id !== props.book.edit)
        .filter(equipment => !props.book.list_for_join.some((eq) => eq.id === equipment.id))

    return props.invisible ? <div/> :
        <div className="mt15 w250">
            <div className="lableImput">Объединить с:</div>
            <div className="blockImput">
                <div
                    id="setEquipment"
                    className="orderInputBox"
                    onClick={() => setlistVisible(true)}
                >
                    <input
                        className="optionFilterInput"
                        onChange={event => {
                            props.changeBookForm(event.target.value, listFilter[props.book.type])
                            props.changeBookForm(1, listPage[props.book.type])
                        }}
                        velue={props.book[listFilter[props.book.type]]}
                        disabled={false}
                    />
                </div>
            </div>
            {listVisible ? (
                <div className="listFilter" id="listSetEquipments">
                    {listEquipment.map(equipment => (
                        <div
                            key={equipment.id}
                            className="rowGropList"
                            onClick={() => {
                                props.chooseBookSelected([equipment], 'list_for_join')
                                setlistVisible(false)
                            }}
                        >
                            {equipment.title}
                        </div>
                    ))}
                </div>
            ) : null}
            <table className="w250">
                <tbody>
                {props.book.list_for_join.map((equipment, idx) => (
                    <tr key={equipment.id}>
                        <td className="w10">{idx + 1}</td>
                        <td className="noWr">{equipment.title}</td>
                        <td onClick={() => props.chooseBookSelected([equipment], 'list_for_join')}>
                            <Icon className="icon-s1" icon={ICON.TRASH} color="red"/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

}

const mapStateToProps = state => ({
    book: state.book
})

const mapDispatchToProps = {
    changeBookForm,
    chooseBookSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinEquipmets)
