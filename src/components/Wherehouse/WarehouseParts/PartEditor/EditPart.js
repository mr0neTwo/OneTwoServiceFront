import React from 'react'
import {connect} from 'react-redux'

import {changePartState} from '../../../../Redux/actions/partAction'


import AddPicture from '../../../general/AddPicture'
import AddDocument from '../../../general/AddDocument'
import LableInput from '../../../general/LableInput'
import ChooseCategory from '../ChooseCategory'
import LableArea from '../../../general/LableArea'
import Specifications from '../Specifications'

const EditPart = (props) => {
    return (
        <div>
            <div className='row al-itm-bl'>
                <div>
                    <AddPicture
                        className='mt15'
                        title='Добавить изображение'
                        url={props.part.image_url}
                        onChange={file => props.changePartState({img: file})}
                        value={props.part.img}
                        disabled={props.part.deleted}
                    />
                    <AddDocument
                        className='mt15'
                        title='Добавить документ'
                        url={props.part.doc_url}
                        onChange={file => props.changePartState({doc: file})}
                        value={props.part.doc}
                        disabled={props.part.deleted}
                    />
                </div>
                <div className='ml30'>
                    <LableInput
                        className='w250 mt15'
                        title='Название'
                        onChange={event => props.changePartState({title: event.target.value})}
                        value={props.part.title}
                        checkedFlag='inputWPartTitleChecked'
                        checked={props.inputWPartTitleChecked}
                        redStar={true}
                        disabled={props.part.deleted}
                    />
                    <ChooseCategory
                        className='mt15'
                        setCategory={category => props.changePartState({warehouse_category: category})}
                        current_category={props.part.warehouse_category}
                        disabled={props.part.deleted}
                    />
                    <LableArea
                        className='w250 mt15'
                        title='Описание'
                        onChange={event => props.changePartState({description: event.target.value})}
                        value={props.part.description}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        className='w250 mt15'
                        title='Маркировка'
                        onChange={event => props.changePartState({marking: event.target.value})}
                        value={props.part.marking}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        className='w250 mt15'
                        title='Артикул'
                        onChange={event => props.changePartState({article: event.target.value})}
                        value={props.part.article}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        className='w250 mt15'
                        title='Штрих код'
                        onChange={event => props.changePartState({barcode: event.target.value})}
                        value={props.part.barcode}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        className='w250 mt15'
                        title='Код'
                        onChange={event => props.changePartState({code: event.target.value})}
                        value={props.part.code}
                        disabled={props.part.deleted}
                    />
                </div>
            </div>
            <Specifications/>
            <div className='sip_line'/>
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part,
    inputWPartTitleChecked: state.view.inputWPartTitleChecked
})

const mapDispatchToProps = {
    changePartState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPart)
