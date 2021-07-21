import React from 'react'

import MenuRow from './MenuRow';


function MenuGroup({group}) {

    return (
        <div>
            {Object.values(group).map(row => {
                return (
                    <MenuRow row = {row} key = {row.title}/>
                    )
                }
            )
            }
        </div>
    )}
   
export default MenuGroup
