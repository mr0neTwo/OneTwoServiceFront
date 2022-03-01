
import React, {useState} from 'react'
import { connect } from 'react-redux'

const Subtype = (props) => {

    const [showPictute, setShowPicture] = useState(false)

    return (
        <div>
            <div
                className="rowGropList"
                onClick={props.onClick}
                onMouseOver={() => setShowPicture(true)}
                onMouseOut={() => setShowPicture(false)}
            >
                {props.subtype.title}
            </div>
            {showPictute && props.subtype.url ?
                <div className='subtypePicture'>
                    <img className='setSubtypeImg' src={`${process.env.PUBLIC_URL}/${props.subtype.url}`}/>
                </div>
                : null
            }
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Subtype)