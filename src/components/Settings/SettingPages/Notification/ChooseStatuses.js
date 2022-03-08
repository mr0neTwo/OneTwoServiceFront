import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {selectedNotEvent} from '../../../../Redux/actions/notEventAction'

import {icon_down, icon_left} from '../../../../data/icons'
import ChooseStatusesGruoup from './ChooseStatusesGruoup'
import Icon from '../../../general/Icon'

const ChooseStatuses = props => {

    const [listVisible, setListVisible] = useState(false)

    const clickHandel = (event) => {
        if (!event.path.map(el => el.id).includes('chooseOfListStatuses') ) {
            if (listVisible) {
                setListVisible(false)
            }}
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })


    return props.unvisible ? null : (
        <div
            className={props.className}
            style={{width: props.width ? props.width : '250px'}}
            id='chooseOfListStatuses'
        >
            <div className='lableImput'>Выберете статусы</div>
            <div
                className='optionsButton'
                onClick={props.disabled ? null : () => setListVisible(!listVisible)}
            >
                <div className='noWr'>{`Выбрано ${props.current_list.length}`}</div>
                <Icon icon={listVisible ? icon_down : icon_left} className='icon-s2' color='grey'/>
            </div>
            {listVisible ?
                <div
                    className='listOptionsChoose'
                    style={{width: props.width ? props.width : '250px'}}
                >
                    {props.status_group.map(group => (
                        <ChooseStatusesGruoup
                            key={group.id}
                            label={group.name}
                            group={group.type_group}
                            func={value => props.func(value)}
                            current_list={props.current_list}
                        />
                    ))}
                </div>
                : null
            }
        </div>
    )
}



const mapStateToProps = state => ({
    status_group: state.data.status_group.filter(group => group.type_group < 8 && group.type_group !== 5)

})

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseStatuses)


// id={}
// title='Наменование'
// className='className'
// list={props.list}
// field='field'
// setElement={props.setElement}
// current_id={props.current_id}
// width={'250px'}
// employee={false}
// checkedFlag='checkedFlag'
// checked={flag}
// disabled={false}
// unvisible={false}