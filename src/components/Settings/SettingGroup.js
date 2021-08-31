import React from 'react'

import SettingRow from './settingRow'




function SettingGroup({group}) {

    return (
        <div>
            {group.map(row => {
                return (
                    <SettingRow row = {row} key = {row.id}/>
                    )
                }
            )
            }
        </div>
    )}
   
export default SettingGroup