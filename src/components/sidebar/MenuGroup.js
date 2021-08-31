import React from 'react'

import MenuRow from './MenuRow'


function MenuGroup({group}) {

    return (

            <div>
                {group.map(row => {
                    return (
                        <MenuRow row = {row} key = {row.id}/>
                        )
                    }
                )
                }
            </div>
    )}
   
export default MenuGroup
