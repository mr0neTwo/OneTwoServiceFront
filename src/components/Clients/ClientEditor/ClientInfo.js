import React from 'react'

import ClientAnotherInfo from './ClientAnotherInfo'
import ClientGenerallyInfo from './ClientGenerallyInfo'
import TopCheckboxes from './TopCheckboxes'

const ClientInfo = () => {
   return (
      <>
         <TopCheckboxes/>
         <ClientGenerallyInfo/>
         <ClientAnotherInfo/>
      </>
   )
}


  
 export default ClientInfo