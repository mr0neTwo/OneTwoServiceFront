import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'


import {icon_down, icon_table} from '../../data/icons'
import Icon from '../general/Icon'
import Checkbox from '../general/Checkbox'
import {changeOrderField} from '../../Redux/actions/orderActions'


const TableOrderFields = props => {

    const [listVisible, setListVisible] = useState(true)

    const clickHandel = (event) => {
        if (!event.composedPath().map(el => el.id).includes('tableOrderFields')) {
            if (listVisible) {
                setListVisible(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    useEffect(() => {
        setListVisible(false)
    }, [])


    return (
        <div
            id='tableOrderFields'
            className={'tableFields otf_pos '}
        >
            <div
                className='chooseFieldButton pd2'
                onClick={() => setListVisible(!listVisible)}
            >
                <div className='cl11'>
                    <Icon icon={props.icon || icon_table} className='icon-table'/>
                </div>
                <div className='cl12'>
                    <Icon icon={icon_down} className='icon-table'/>
                    {/*<span className="fieldSeparate">&#6662;</span>*/}
                </div>
            </div>

            {listVisible ?
                <div className='listOptionField'>
                    <div style={{overflow: 'auto'}}>
                        {props.order.tableFields.map(field => {
                            return (
                                <div
                                    key={field.id}
                                    className='options'
                                >
                                    <Checkbox
                                        className='ml10'
                                        label={field.title}
                                        onChange={event => props.changeOrderField(field.id, 'visible', event.target.checked)}
                                        checked={field.visible}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div> : null}

        </div>
    )
}

const mapStateToProps = state => ({
    order: state.order
})

const mapDispatchToProps = {
    changeOrderField
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOrderFields)

// id='id'
// className='className'
// height='200px'
// list={props.list}
// checked_list={props.checked_list}
// func={() => console.log('choose element')}
// field='field'
