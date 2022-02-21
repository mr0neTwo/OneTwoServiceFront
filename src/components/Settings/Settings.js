import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'

import SettingMenu from './SettingMenu'
import {  } from '../../Redux/actions'

import Generally from './SettingPages/Generally/Generally'
import SettingEmployees from './SettingPages/Employees/SettingEmployees'
import SettingBranches from './SettingPages/Branches/SettingBranches'
import SettingWherehouse from './SettingPages/Wherehouse/SettingWherehouse'
import SettingStatus from './SettingPages/SettingStatus'
import SettingTags from './SettingPages/SettingTags'
import SettingAlerts from './SettingPages/SettingAlerts'
import SettingServicePrices from './SettingPages/ServicePrices/SettingServicePrices'
import SettingBooks from './SettingPages/Books/SettingBooks'
import SettingTemplates from './SettingPages/SettingTemplates'
import SettingMargin from './SettingPages/Margin/SettingMargin'
import SettingMarkening from './SettingPages/SettingMarkening'


const Settings = (props) => {


  return (
    <div className='settingPage'>
      <SettingMenu/>
      {/* <div className='settingContent'> */}
          <Switch>
              <Route path = '/settings/generally' component = {Generally}/>
              <Route path = '/settings/employees' component={SettingEmployees}/>
              <Route path = '/settings/branches' component = {SettingBranches}/>
              <Route path = '/settings/wherehouse' component = {SettingWherehouse}/>
              <Route path = '/settings/status' component = {SettingStatus}/>
              <Route path = '/settings/tags' component = {SettingTags}/>
              <Route path = '/settings/alerts' component = {SettingAlerts}/>
              <Route path = '/settings/services_pricelist' component = {SettingServicePrices}/>
              <Route path = '/settings/books' component = {SettingBooks}/>
              <Route path = '/settings/document-templates' component = {SettingTemplates}/>
              <Route path = '/settings/prices' component = {SettingMargin}/>
              <Route path = '/settings/marketing' component = {SettingMarkening}/>

              <Redirect from='/settings' to='/settings/generally'/>
            </Switch>
          {/* </div> */}
    </div>
  )
}

const mapStateToProps = state => ({
//   dataSidebarRows: 'dataSidebarRows',
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings))
