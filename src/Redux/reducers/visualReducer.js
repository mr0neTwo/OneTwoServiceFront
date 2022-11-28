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
   statusClientEditor: false,
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
   statusWarehouseEditor: false,
   statusWarehouseEmployeeEditor: false,
   statusWarehouseCategoryEditor: false,
   statusOrderPartEditor: false,
   statusOrderSticker: false,
   statusOrderLoader: false,
   checkOrderSticker: localStorage.getItem('checkOrderSticker') === 'true',
   statusNotTemplateEditor: false,
   statusNotEventEditor: false,
   needToResetOrder: false,
   statusRegistrationEditor: false,
   statusRegistrationPartEditor: false,
   statusRemainEditor: false,
   statusResidueRuleEditor: false,
   statusOrderNotFound: false,
   statusWriteOfEditor: false,
   statusPartEditor: false,
   statusMovementEditor: false,
   statusBackEditor: false,
   statusReturnPart: false,

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
   inputMalfunctionChecked: true,
   checkedOrderKindofGood: true,
   checkedOrderBrand: true,
   checkedOrderSubtype: true,
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
   inputWarehouseTitleChecked: true,
   inputWCategoryTitleChecked: true,
   inputWPartTitleChecked: true,
   inputOrderPartTitleChacked: true,
   inputOrderPartEngineerChecked: true,
   inputNotTempTitleChecked: true,
   inputNotTempTempleChecked: true,
   inputNotEventEventChecked: true,
   inputNotEventTemplateChecked: true,
   inputFilterTitleChecked: true,
   inputRegistrationLabelChecked: true,
   inputRegistrationWarehouseChecked: true,
   inputRegistrationCountChecked: true,
   inputRegistrationClientChecked: true,
   inputRegistrationPartChecked: true,
   inputResRulWarehouse: true,
   inputEngineerWriteOf: true,
   inputTargetWarehouseMovement: true,
   inputWarehouseBack: true,
   inputWarehouseReturnPart: true,

   errorSameMail: false,
   errorSameLogin: false,
   statusRefreshPage: false
}

// todo: переписать ненужные функции
export const visualReducer = (state = initialState, action) => {
   switch (action.type){

      case 'CHANGE_VISIBLE_STATE': {
         return {...Object.assign(state, action.data)}
      }

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


      


      default: return state
   }
   
}
