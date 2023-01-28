import React from 'react';
import {connect} from 'react-redux'


import MenuGroup from './MenuGroup';
import LogoUser from './userSettings/LogoUser';
import {Nav} from '../../data/dataSidebarRows'

const generateGeneralMenu = (permission, userPermission) => permission.filter(row => row.permission_keys.some(key => userPermission.includes(key)))

function Sidebar(props) {

    const generally_menu = generateGeneralMenu(Nav.Main, props.permission)
    const report_menu = generateGeneralMenu(Nav.Second, props.permission)
    const setting_menu = generateGeneralMenu(Nav.Third, props.permission)
    // const report_menu = Nav.Second.filter(row =>row.permission_keys.some(key => props.permission.includes(key)))
    // const setting_menu = Nav.Third.filter(row => row.permission_keys.some(key => props.permission.includes(key)))


    return (
        <div className='sidebar'>
            <div className='sidebar__body'>
                <LogoUser/>
                <div>
                    <hr className='sidebar__hr'/>
                    {generally_menu.length ?
                        <>
                            <MenuGroup
                                key={1011}
                                group={generally_menu}
                                color={props.color}
                            />
                            <hr className='sidebar__hr'/>
                        </> : null}

                    {report_menu.length ?
                        <>
                            <MenuGroup
                                key={1012}
                                group={report_menu}
                                color={props.color}
                            />
                            <hr className='sidebar__hr'/>
                        </> : null}

                    {setting_menu.length ?
                        <MenuGroup
                            key={1013}
                            group={setting_menu}
                            color={props.color}
                        /> : null}

                </div>
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