import React from 'react'

import EditPart from './EditPart'
import EditPrices from './EditPrices'
import Specifications from './Specifications'
import EditResidueRules from "./EditResidueRules";
import EditPartSalary from "./EditPartSalary";

const MainPartEditor = () => {

    return (
        <div className='modal__block-forms'>
            <EditPart/>
            <Specifications/>
            <EditPrices/>
            <EditResidueRules/>
            <EditPartSalary/>
        </div>
    )
}



export default MainPartEditor