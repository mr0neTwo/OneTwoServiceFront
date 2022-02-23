import React from 'react'
import { connect } from 'react-redux'

const WarehouseWriteOf = props => {
    return (
        <div className = 'contentTab'>
            <div className = 'tempPage'>
                <div className = 'tempContainer'>
                    <h1 className = 'tempTitle'>Здесь будут списания</h1>
                    <p className = 'tempDescription'>Страница на стадии разработки</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseWriteOf)