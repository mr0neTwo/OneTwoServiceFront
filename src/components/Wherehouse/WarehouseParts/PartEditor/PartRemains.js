import React, {useMemo, useState} from 'react'
import { connect } from 'react-redux'
import ChooseButton from '../../../general/ChooseButton'
import Remain from './Remain'

const PartRemains = (props) => {

    const [show, setShow] = useState(0)

    const remains = useMemo(() => {
        if (show === 1) {
            return props.part.remains.filter(remain => remain.count > 0)
        } else {
            return props.part.remains
        }
    }, [show, props.part.remains])

    return (
        <div className=''>
            <ChooseButton
                className='mt15'
                title= 'Подпись'
                name={['В наличии', 'Все']}
                func1 = {() => setShow(0)}
                func2 = {() => setShow(1)}
                checked = { true }
            />

            {remains.map(remain => <Remain key={remain.id} remain={remain}/>)}

        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PartRemains)