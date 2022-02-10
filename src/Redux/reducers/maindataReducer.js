const initialState = {
   name: '',
   address: '',
   email: '',

   ogrn: '',
   inn: '',
   kpp: '',
   juridical_address: '',
   director: '',
   bank_name: '',
   settlement_account: '',
   corr_account: '',
   bic: '',

   description: '',
   phone: '',
   logo: ''

}

export const maindataReducer = (state = initialState, action) => {
   switch (action.type){


      case 'CHANGE_MAINDATA_FORM': {

         return {
            ...state, 
            [action.field]: action.value
         }
      }

      case 'ADD_GENERALLY_INFO': {

         return {
            ...state, 
            name: action.data.name,
            address: action.data.address,
            email: action.data.email,
         
            ogrn: action.data.ogrn,
            inn: action.data.inn,
            kpp: action.data.kpp,
            juridical_address: action.data.juridical_address,
            director: action.data.director,
            bank_name: action.data.bank_name,
            settlement_account: action.data.settlement_account,
            corr_account: action.data.corr_account,
            bic: action.data.bic,
         
            description: action.data.description,
            phone: action.data.phone,
            logo: action.data.logo
         }
      }

      
      default: return state
   }
   
}
