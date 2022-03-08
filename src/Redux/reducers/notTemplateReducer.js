const initialState = {

    templates: [],

    edit: 0,
    title: '',
    template: '',
    deleted: false,

    showDeleted: false
}

export const notTemplateReducer = (state = initialState, action) => {
    switch (action.type){

        case 'CHANGE_NOT_TEMPLATE_FORM': {
            return {
                ...state,
                [action.field]: action.value
            }
        }

        case 'EDIT_NOT_TEMPLATE': {
            return {
                ...state,
                edit: action.template.id,
                title: action.template.title,
                template: action.template.template,
                deleted: action.template.deleted
            }
        }

        case 'RESET_NOT_TEMPLATE': {
            return {
                ...state,
                edit: 0,
                title: '',
                template: '',
                deleted: false,
            }
        }

        // case 'SELECTED_TEMPLE': {
        //     if (action.value.every(val => state[action.field].includes(val))) {
        //         return {
        //             ...state,
        //             [action.field]: state[action.field].filter(val => !action.value.includes(val)),
        //         }
        //     } else {
        //         return {
        //             ...state,
        //             [action.field]: state[action.field].concat(action.value.filter(val => !state[action.field].includes(val)))
        //         }
        //     }
        // }


        default: return state
    }

}