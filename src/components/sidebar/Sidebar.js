import React, {useState} from 'react';
import MenuGroup from './MenuGroup';
import dataMenuRowsExp from '../../data/dataSidebarRows';
import LogoUser from './LogoUser';

function Sidebar() {

    const [dataMenuRows, setMenuRows] = useState(dataMenuRowsExp);



    


    return (
        <div className = 'sidebarMain'> 
            <LogoUser/>
            <MenuGroup data = {dataMenuRows.generallyMenu} key = 'generallyMenu'/>
            <hr className = 'hrMenu' />
            <MenuGroup data = {dataMenuRows.reportMenu} key = 'reportMenu'/>
            <hr className = 'hrMenu' />
            <MenuGroup data = {dataMenuRows.settingMenu} key = 'settingMenu'/>
        </div>
    )
}

export default Sidebar;