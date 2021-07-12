import React from 'react'
import MenuRow from './MenuRow';


function MenuGroup(props) {
    
    return (
        <div>
            
            {Object.keys(props.data).map(key => {
                return (
                    <MenuRow data = {props.data[key]} key = {key}/>
                    )
                }
            )
            }
        </div>
    )
}

export default MenuGroup;
