import React from 'react'
import { connect } from 'react-redux'
import Button from '../../general/Button'
import {addPartProperty} from '../../../Redux/actions/partAction'
import Property from './Property'

const Specifications = (props) => {
    return (
        <div className = ''>
            <div className='lableImput'>Характеристики</div>
            <div className='mwmc'>
                <table>
                    <tbody>
                        {props.part.specifications.map((property, idx) => (
                            <Property
                                key={idx}
                                idx={idx}
                                title={property.title}
                                value={property.value}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <Button
                className='whiteBlueBotton'
                title='+ Свойство'
                onClick={() => props.addPartProperty()}
                disabled={props.part.deleted}

            />
        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {
    addPartProperty
}

export default connect(mapStateToProps, mapDispatchToProps)(Specifications)