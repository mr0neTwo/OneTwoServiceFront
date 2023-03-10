const initialState = {

    clients: [],

    juridical: false,
    supplier: false,
    conflicted: false,
    should_send_email: false,
    deleted: false,

    name: '',
    name_doc: '',
    email: '',
    address: '',
    phone: [{
        title: 'Мобильный',
        number: '',
        notify: false
    }],
    ad_campaign: {id: 1},
    discount_code: '',
    discount_goods: 0,
    discount_goods_margin: {},
    discount_materials: 0,
    discount_materials_margin: {},
    discount_services: 0,
    discount_service_margin: {},
    notes: '',
    tags: [],

    ogrn: '',
    inn: '',
    kpp: '',
    juridical_address: '',
    director: '',
    bank_name: '',
    settlement_account: '',
    corr_account: '',
    bic: '',

    discount_good_type: false,
    discount_materials_type: false,
    discount_service_type: false,

    tabs: 0,
    phone_titles: ['Мобильный', 'Рабочий', 'Домашний'],

    page: 0,
    filter_name: '',
    filter_phone: '',
    search: '',
    showDeleted: false
}

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CHANGE_CLIENT_STATE': {
            return {...Object.assign(state, action.data)}
        }

        case 'CHANGE_CLIENT_EDITOR_PHONE': {

            let phones = state.phone
            phones[action.idx][action.field] = action.value

            return {
                ...state,
                phone: phones
            }
        }

        case 'ADD_PHONE_COUNTER': {

            return {
                ...state,
                phone: state.phone.concat([{
                    title: 'Мобильный',
                    number: '',
                    notify: false
                }])
            }
        }

        case 'DELETE_COUNT_NUMBER': {

            let phones = state.phone
            phones.splice(action.idx, 1)


            return {
                ...state,
                phone: phones
            }
        }

        case 'ADD_CLIENT_TAG': {

            return {
                ...state,
                tags: state.tags.concat([action.tag])
            }
        }

        case 'DELETE_CLIENT_TAG': {

            let tags_list = state.tags
            tags_list.splice(action.idx, 1)

            return {
                ...state,
                tags: tags_list
            }
        }

        case 'RESET_CLIENT': {
            return {
                ...state,
                juridical: false,
                supplier: false,
                conflicted: false,
                should_send_email: false,
                deleted: false,

                name: '',
                name_doc: '',
                email: '',
                address: '',
                phone: [{
                    title: 'Мобильный',
                    number: '',
                    notify: false
                }],
                ad_campaign: {id: 1},
                discount_code: '',
                discount_goods: 0,
                discount_goods_margin: {},
                discount_materials: 0,
                discount_materials_margin: {},
                discount_services: 0,
                discount_service_margin: {},
                notes: '',
                tags: [],

                ogrn: '',
                inn: '',
                kpp: '',
                juridical_address: '',
                director: '',
                bank_name: '',
                settlement_account: '',
                corr_account: '',
                bic: '',

                discount_good_type: false,
                discount_materials_type: false,
                discount_service_type: false,

                edit: 0,
                tabs: 0,

            }
        }

        case 'CHANGE_CLIENT_TABS': {

            return {
                ...state,
                tabs: action.tab
            }
        }


        case 'EDIT_CLIENT': {
            return {
                ...state,
                juridical: action.client.juridical,
                supplier: action.client.supplier,
                conflicted: action.client.conflicted,
                should_send_email: action.client.should_send_email,
                deleted: action.client.deleted,

                name: action.client.name,
                name_doc: action.client.name_doc || '',
                email: action.client.email || '',
                address: action.client.address || '',
                phone: action.client.phone,
                ad_campaign: action.client.ad_campaign,
                discount_code: action.client.discount_code,
                discount_goods: action.client.discount_goods,
                discount_goods_margin: action.client.discount_goods_margin,
                discount_materials: action.client.discount_materials,
                discount_materials_margin: action.client.discount_materials_margin,
                discount_services: action.client.discount_services,
                discount_service_margin: action.client.discount_service_margin,
                notes: action.client.notes,
                tags: action.client.tags,

                ogrn: action.client.ogrn,
                inn: action.client.inn,
                kpp: action.client.kpp,
                juridical_address: action.client.juridical_address,
                director: action.client.director,
                bank_name: action.client.bank_name,
                settlement_account: action.client.settlement_account,
                corr_account: action.client.corr_account,
                bic: action.client.bic,

                discount_good_type: action.client.discount_good_type,
                discount_materials_type: action.client.discount_materials_type,
                discount_service_type: action.client.discount_service_type,

                edit: action.client.id,
            }
        }


        case 'EDIT_CURRENT_CLIENT': {
            return {
                ...state,
                juridical: action.client.juridical,
                supplier: action.client.supplier,
                conflicted: action.client.conflicted,
                should_send_email: action.client.should_send_email,
                deleted: action.client.deleted,

                name: action.client.name,
                name_doc: action.client.name_doc,
                email: action.client.email,
                address: action.client.address,
                phone: action.client.phone,
                ad_campaign: action.client.ad_campaign,
                discount_code: action.client.discount_code,
                discount_goods: action.client.discount_goods,
                discount_goods_margin: action.client.discount_goods_margin,
                discount_materials: action.client.discount_materials,
                discount_materials_margin: action.client.discount_materials_margin,
                discount_services: action.client.discount_services,
                discount_service_margin: action.client.discount_service_margin,
                notes: action.client.notes,
                tags: action.client.tags,

                ogrn: action.client.ogrn,
                inn: action.client.inn,
                kpp: action.client.kpp,
                juridical_address: action.client.juridical_address,
                director: action.client.director,
                bank_name: action.client.bank_name,
                settlement_account: action.client.settlement_account,
                corr_account: action.client.corr_account,
                bic: action.client.bic,

                discount_good_type: action.client.discount_good_type,
                discount_materials_type: action.client.discount_materials_type,
                discount_service_type: action.client.discount_service_type,

                edit: action.client.id,
                tabs: 1
            }
        }


        default:
            return state
    }

}
