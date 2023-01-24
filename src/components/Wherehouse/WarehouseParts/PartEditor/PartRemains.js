import React, {useMemo, useState} from 'react'
import { connect } from 'react-redux'
import ChooseButton from '../../../general/ChooseButton'
import Remain from './Remain'

const PartRemains = (props) => {

    const [show, setShow] = useState(1)

    const remains = useMemo(() => {
        if (show === 1) {
            return props.part.remains.filter(remain => remain.remains.map(remain => remain.count).reduce((partialSum, a) => partialSum + a, 0) > 0)
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
                func1 = {() => setShow(1)}
                func2 = {() => setShow(0)}
                checked = { true }
            />

            {remains.sort((a, b) => a.id - b.id).map(remain => <Remain key={remain.id} remain={remain}/>)}

        </div>
    )
}

const mapStateToProps = state => ({
    part: state.part
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PartRemains)