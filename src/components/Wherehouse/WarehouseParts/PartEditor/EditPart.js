import React from 'react'
import {connect} from 'react-redux'

import {changePartState} from '../../../../Redux/actions/partAction'


import AddPicture from '../../../general/AddPicture'
import AddDocument from '../../../general/AddDocument'
import LableInput from '../../../general/LableInput'
import ChooseCategory from '../ChooseCategory'
import LableArea from '../../../general/LableArea'
import Specifications from './Specifications'
import ChooseButton from '../../../general/ChooseButton'

const EditPart = (props) => {
    return (
        <div className='modal__block-forms'>
            <div className='modal__block-forms_row'>

                <div className='modal__block-forms'>
                    <AddPicture
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

                <div className='modal__block-forms w220'>
                    <LableInput
                        title='Название'
                        onChange={event => props.changePartState({title: event.target.value})}
                        value={props.part.title}
                        checkedFlag='inputWPartTitleChecked'
                        checked={props.inputWPartTitleChecked}
                        redStar={true}
                        disabled={props.part.deleted}
                    />
                    <ChooseCategory
                        setCategory={category => props.changePartState({warehouse_category: category})}
                        current_category={props.part.warehouse_category}
                        disabled={props.part.deleted}
                    />
                    <LableArea
                        title='Описание'
                        onChange={event => props.changePartState({description: event.target.value})}
                        value={props.part.description}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        title='Маркировка'
                        onChange={event => props.changePartState({marking: event.target.value})}
                        value={props.part.marking}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        title='Артикул'
                        onChange={event => props.changePartState({article: event.target.value})}
                        value={props.part.article}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        title='Штрих код'
                        onChange={event => props.changePartState({barcode: event.target.value})}
                        value={props.part.barcode}
                        disabled={props.part.deleted}
                    />
                    <LableInput
                        title='Код'
                        onChange={event => props.changePartState({code: event.target.value})}
                        value={props.part.code}
                        disabled={props.part.deleted}
                    />
                </div>

            </div>
            <div className='two-buttons'>
                <LableInput
                    title='Гарантия'
                    onChange={event => props.changePartState({warranty_period: event.target.value.replace(/[^0-9]/g, '') * props.part.warranty_value})}
                    value={parseInt(props.part.warranty_period / props.part.warranty_value)}
                    disabled={props.part.deleted}
                />
                <ChooseButton
                    name={['Дни', 'Мес']}
                    func1={() => props.changePartState({warranty_value: 24 * 60 * 60})}
                    func2={() => props.changePartState({warranty_value: 30 * 24 * 60 * 60})}
                    disabled={props.part.deleted}
                />
            </div>


            {/*<div className='split-line'/>*/}

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
