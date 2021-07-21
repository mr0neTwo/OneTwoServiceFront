import React from 'react';
import MenuGroup from './MenuGroup';
import LogoUser from './LogoUser';
import { connect } from 'react-firebase'
import  Loader  from '../Loader/Loader';

function Sidebar({dataSidebarRows}) {

    if (dataSidebarRows) {
        const sidebarRows = Object.values(dataSidebarRows)
        return (
            <div className = 'sidebarMain'> 
                <LogoUser/>
                {sidebarRows.map((group, idx) => {
                    return (
                        <>
                        <hr className = 'hrMenu' />
                        <MenuGroup group = {group} key = {idx}/>
                        </>
                    )
                })}
            </div>
        )
    }
    else {
     return (<Loader/>)
    }
}

const mapFirebaseToProps = (props, ref) => ({
    dataSidebarRows: 'dataSidebarRows'
  })
   
export default connect(mapFirebaseToProps)(Sidebar)