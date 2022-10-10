import React, {useEffect} from 'react'
import {connect} from 'react-redux'

import {setVisibleFlag} from '../../../Redux/actions';
import {changePartState, resetPart, createPart, savePart, deletePart} from '../../../Redux/actions/partAction';

import LableInput from '../../general/LableInput'
import BottomButtons from '../../general/BottomButtons'
import AddPicture from '../../general/AddPicture';
import Specifications from './Specifications'
import LableArea from '../../general/LableArea'
import AddDocument from '../../general/AddDocument'
import ChooseCategory from './ChooseCategory'

const PartEditor = props => {

    const handleClose = () => {
        props.setVisibleFlag('statusPartEditor', false)
        props.setVisibleFlag('inputWPartTitleChecked', true)
        props.resetPart()
    }

    const clickHandel = event => {
        if (
            !event.path.map((el) => el.id).includes('wpartEditorWindow') &&
            !event.path.map((el) => el.id).includes('btaddWP')
        ) {
            handleClose()
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickHandel)
        return () => {
            window.removeEventListener('click', clickHandel)
        }
    })

    const handleCreate = () => {
        if (props.part.title) {
            props.createPart()
        } else {
            props.setVisibleFlag('inputWPartTitleChecked', false)
        }
    }

    const handleSave = () => {
        if (props.part.title) {
            props.savePart()
        } else {
            props.setVisibleFlag('inputWPartTitleChecked', false)
        }
    }


    const can_delete = props.permissions.includes('delete_parts')
    const can_recover = props.permissions.includes('recover_parts')

    return (
        <div className='rightBlock'>
            <div className='rightBlockWindow' id='wpartEditorWindow'>
                <div className='createNewTitle'>{props.part.edit ? props.part.title : 'Новый товар'}</div>

                <div className='contentEditor'>
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

                </div>


                <BottomButtons
                    edit={props.part.edit}
                    deleted={props.part.deleted}
                    create={handleCreate}
                    save={handleSave}
                    delete={can_delete ? () => props.deletePart(true) : null}
                    recover={can_recover ? () => props.deletePart(false) : null}
                    close={handleClose}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    part: state.part,
    inputWPartTitleChecked: state.view.inputWPartTitleChecked,
    permissions: state.data.user.role.permissions
})

const mapDispatchToProps = {
    setVisibleFlag,
    changePartState,
    resetPart,
    createPart,
    savePart,
    deletePart
}

export default connect(mapStateToProps, mapDispatchToProps)(PartEditor)
