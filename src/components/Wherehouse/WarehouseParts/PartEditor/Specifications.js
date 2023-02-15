import React from 'react'
import { connect } from 'react-redux'
import Button from '../../../general/Button'
import {addPartProperty} from '../../../../Redux/actions/partAction'
import Property from '../Property'

const Specifications = (props) => {
    return (
        <div className = 'modal__block-forms'>

            <div className='w420'>
                <h5>Характеристики</h5>
                <table>
                    <thead>
                        <tr>
                            <th className='w200'/>
                            <th className='w200'/>
                            <th className='w20'/>
                        </tr>
                    </thead>
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
                size='med'
                type='tertiary'
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