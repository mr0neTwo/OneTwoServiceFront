import React from 'react';
import {connect} from 'react-redux'


import MenuGroup from './MenuGroup';
import LogoUser from './userSettings/LogoUser';
import {Nav} from '../../data/dataSidebarRows'

function Sidebar(props) {

    const generally_menu = Nav.Main.filter(row => row.permission_keys.some(key => props.permission.includes(key)))
    const report_menu = Nav.Second.filter(row =>row.permission_keys.some(key => props.permission.includes(key)))
    const setting_menu = Nav.Third.filter(row => row.permission_keys.some(key => props.permission.includes(key)))


    return (
        <div className='container-sidebar'>
            <LogoUser/>
            <div>
                <hr className='hr-menu'/>
                {generally_menu.length ?
                    <>
                        <MenuGroup
                            key={1011}
                            group={generally_menu}
                            color={props.color}
                        />
                        <hr className='hr-menu'/>
                    </> : null}

                {report_menu.length ?
                    <>
                        <MenuGroup
                            key={1012}
                            group={report_menu}
                            color={props.color}
                        />
                        <hr className='hr-menu'/>
                    </> : null}

                {setting_menu.length ?
                    <MenuGroup
                        key={1013}
                        group={setting_menu}
                        color={props.color}
                    /> : null}

            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    menuRows: state.data.menuRows,
    permission: state.data.user.role.permissions,
    color: state.branch.current_branch.color
})

export default connect(mapStateToProps)(Sidebar)