const initialState = {
   statusMenuVisible : {},
   statusSetCustomFilter: false,
   stausListFilter: false,
   typeListFilter: false,
   managerListFilter: false,
   engineerListFilter: false,
   groupListFilter: false,
   brandListFilter: false,
   subtypeListFilter: false,
   clientListFilter: false,
   statusCreateNewFilter: false,
   statusCreateNewRole: false,
   statusEmployeeEditor: false,
   employeeEditorRoleOptions: false,
   statusOrderEditor: false,
   statusCreateNewClient: false,
   statusAdCampaignClient: false,
   checkedOrderClient: false,
   statusBranchEditor: false,
   statusChooseIcon: false,
   statusEquipmentEditor: false,
   statusElementEditor: false,
   statusCashboxEditor: false,
   statusCashboxEmployeeEditor: false,
   statusPaymentsEditor: false,
   statusPaymentsCard: false,
   statusStatusList: false,
   statusSalaryEditor: false,
   statusPriceEditor: false,
   statusGroupServiceEditor: false,
   statusServiceEditor: false,
   statusOperationEditor: false,
   statusPayrollEditor: false,
   statusCellEditor: false,
   statusWherehouseEditor: false,

   inputClientNameChecked: true,
   inputClientPhoneChecked: [true],
   inputClientDiscServChecked: true,
   inputClientDiscMatChecked: true,
   inputClientDiscGoodChecked: true,
   inputRoleTitleChecked: true,
   inputEmployeeNameChecked: true,
   inputEmployeeEmailChecked: true,
   inputEmployeeLoginChecked: true,
   inputEmployeePasswordChecked: true,
   inputEmployeeRoleChecked: true,
   inputMalfunctionChecked: [true],
   checkedOrderKindofGood: [true],
   checkedOrderBrand: [true],
   checkedOrderSubtype: [true],
   inputMaindataNameChecked: true,
   inputBranchNameChecked: true,
   inputBranchPrefixChecked: true,
   inputBranchPrefixDocChecked: true,
   inputBookTitleChecked: true,
   inputCashboxTitleChecked: true,
   inputPaymentDescChecked: true,
   inputPaymentCashflowChecked: true,
   inputPaymentCashboxChecked: true,
   inputPaymentEmployeeChecked: true,
   inputPaymentSumChecked: true,
   inputPriceTitleChecked: true,
   inputDictServiceChecked: true,
   inputServiceTitleChecked: true,
   inputServiceCategoryIdChacked:true,
   inputServicePriceChacked:true,
   inputOperationEngineerChacked: true,
   inputOperationTitleChacked: true,
   inputPayrollDescChecked: true,
   inputPayrollEmployeeChecked: true,
   inputPayrollSumChecked: true,
   inputSingleMalfunctionChecked: true,

   errorSameMail: false,
   errorSameLogin: false
}

export const visualReducer = (state = initialState, action) => {
   switch (action.type){

      case 'INIT_STATUS_MENU_VISIBLE': {
         return {
            ...state, 
            statusMenuVisible: action.data,
         }
      }

      case 'CANGE_STATUS_MENU_VISIBLE': {
      return {
         ...state, 
         statusMenuVisible: {...state.statusMenuVisible, [action.id_order]: !state.statusMenuVisible[action.id_order]},
         }
      }
      
      case 'CHANGE_STATUS_SET_STATUS_FILTER': {
         return {
            ...state, 
            statusSetCustomFilter: !state.statusSetCustomFilter,
         }
      }

      case 'CHANGE_STATUS_LIST_FILTER': {
         return {
            ...state, 
            stausListFilter: !state.stausListFilter,
         }
      }
      
      case 'CHANGE_TYPE_LIST_FILTER': {
         return {
            ...state, 
            typeListFilter: !state.typeListFilter,
         }
      }

      case 'CHANGE_MANAGER_LIST_FILTER': {
         return {
            ...state, 
            managerListFilter: !state.managerListFilter,
         }
      }

      case 'CHANGE_ENGINEER_LIST_FILTER': {
         return {
            ...state, 
            engineerListFilter: !state.engineerListFilter,
         }
      }

      case 'CHANGE_GROUP_LIST_FILTER': {
         return {
            ...state, 
            groupListFilter: !state.groupListFilter,
         }
      }

      case 'CHANGE_BRAND_LIST_FILTER': {
         return {
            ...state, 
            brandListFilter: !state.brandListFilter,
         }
      }

      case 'CHANGE_SUBTYPE_LIST_FILTER': {
         return {
            ...state, 
            subtypeListFilter: !state.subtypeListFilter,
         }
      }

      case 'CHANGE_CLIENT_LIST_FILTER': {
         return {
            ...state, 
            clientListFilter: !state.clientListFilter,
         }
      }

      case 'CHANGE_STATUS_CREATE_NEW_FILTER': {
         return {
            ...state, 
            statusCreateNewFilter: !state.statusCreateNewFilter,
         }
      }
      
      case 'EDIT_ROLE': {
         return {
            ...state, 
            statusCreateNewRole: !state.statusCreateNewRole,
         }
      }


      case 'CHANGE_EMPLOYEE_EDITOR_ROLE_OPTIONS': {
         return {
            ...state, 
            employeeEditorRoleOptions: !state.employeeEditorRoleOptions,
         }
      }
      
      case 'SET_ROLE_EMPLOYEE_EDITOR': {
         return {
            ...state, 
            employeeEditorRoleOptions: !state.employeeEditorRoleOptions,
            inputEmployeeRoleChecked: true
         }
      }



      case 'CHANGE_STATUS_AD_CAMPAIGN_CLIENT': {
         return {
            ...state, 
            statusAdCampaignClient: !state.statusAdCampaignClient,
         }
      }
      
      case 'SET_AD_CANMPAIGN_CLIENT': {
         return {
            ...state, 
            statusAdCampaignClient: !state.statusAdCampaignClient,
         }
      }

      case 'SET_VISIBLE_FLAG': {

         if (action.value === 'change') {
            return {
               ...state, 
               [action.field]: !state[action.field]
            }
         } else {
            return {
               ...state,
            [action.field]: action.value
            }
         }
      }

      case 'SET_VISIBLE_LIST_FLAG': {

         const list = state[action.field]

         if (action.value === 'change') {
            list[action.idx] = !list[action.idx] 
            return {
               ...state, 
               [action.field]: list
            }
         } else {
            list[action.idx] = action.value
            return {
               ...state,
            [action.field]: list
            }
         }
      }

      case 'DELETE_FLAG': {
         const list = state[action.field]
         list.splice(action.idx, 1)
         return {
            ...state,
            [action.field]: list
         }
      }

      case 'ADD_FLAG': {
         return {
            ...state,
            [action.field]: state[action.field].concat([true])
         }
      }

      
      case 'EDIT_CLIENT': {
         return {
            ...state, 
            statusCreateNewClient: true
         }
      }

      case 'CHANGE_EMPLOYEE_EDITOR_FORM': {
         if (action.field === 'email')
         return {
            ...state, 
            errorSameMail: false
         }
         if (action.field === 'login')
         return {
            ...state, 
            errorSameLogin: false
         }
         return state
      }
      
      case 'ADD_ANOTHER_EQUIPMENT': {
         return {
            ...state, 
            inputMalfunctionChecked: state.inputMalfunctionChecked.concat([true]),
            checkedOrderKindofGood: state.checkedOrderKindofGood.concat([true]),
            checkedOrderBrand: state.checkedOrderBrand.concat([true]),
            checkedOrderSubtype: state.checkedOrderSubtype.concat([true])
         }
      }

      case 'DELETE_DEVICE': {

         let checked_list_malfunction = state.inputMalfunctionChecked
         checked_list_malfunction.splice(action.idx, 1)

         let checked_list_kindof_good = state.checkedOrderKindofGood
         checked_list_kindof_good.splice(action.idx, 1)

         let checked_list_brand = state.checkedOrderBrand
         checked_list_brand.splice(action.idx, 1)

         let checked_list_subtype = state.checkedOrderSubtype
         checked_list_subtype.splice(action.idx, 1)

         return {
            ...state, 
            inputMalfunctionChecked: checked_list_malfunction,
            checkedOrderKindofGood: checked_list_kindof_good,
            checkedOrderBrand: checked_list_brand,
            checkedOrderSubtype: checked_list_subtype
         }
      }

      
      // case 'SET_ORDER_EQUIPMENT': {
         
      //    let checked_list = state[action.field]
      //    checked_list[action.idx] = true

      //    return {
      //       ...state, 
      //       [action.field]: checked_list
      //    }
      // }

      


      default: return state
   }
   
}
