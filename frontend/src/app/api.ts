// export const apin = "http://192.168.1.163:5001/api";
export const apin = "http://127.0.0.1:5001/api"

// export const apin = window.location.protocol + '//' + window.location.hostname+':5001/api';

// export const apin = "http://34.100.227.119:5001/api";


export const endPointsUser = {
    // Endpoints for UserCreate
    getcros: `${apin}/cros`,
    getCroById: `${apin}/cro/`,
    getCroAddUpdate: `${apin}/cro`,

    // Endpoints for UserCreate
    getUser: `${apin}/user/register`,
    getUserById: `${apin}/user_actions/`,
    getUserAddUpdate: `${apin}/user/register`,
    getUserUpdate: `${apin}/user_actions/`,

    // Endpoints for  Login
    login: `${apin}/login`,
    sendotp: `${apin}/login/sendotp`,
    reset: `${apin}/user/register`,
    dashboard: `${apin}/dashboard`,

    // Endpoints for sponsors
    getSponsors: `${apin}/sponsors`,
    getSponsorsById: `${apin}/sponsor/`,
    getSponsorsAddUpdate: `${apin}/sponsor`,

    // Endpoints for sponsors
    getLab: `${apin}/labs`,
    getLabById: `${apin}/lab/`,
    getLabAddUpdate: `${apin}/lab`,

    // Endpoints for Site
    getSites: `${apin}/sites_data`,
    getSiteById: `${apin}/site_data/`,
    getSiteAddUpdate: `${apin}/site_data`,

    // Endpoints for Lab Test
    getLabTest: `${apin}/lab_tests`,
    getLabTestById: `${apin}/lab_test/`,
    getLabTestAddUpdate: `${apin}/lab_test`,

    // Endpoints for Material
    meterials: `${apin}/meterials`,
    materialAddUpdate: `${apin}/meterial`,
    getmeterialById: `${apin}/meterial/`,

    // Endpoints for Protocol
    postProtocol: `${apin}/cro_protocol`,
    croProtocols: `${apin}/cro_protocols`,
    getProtocolId: `${apin}/cro_protocol/`,
    kitsinventory:`${apin}/kits_inventory_ns/`,
    kitsnsv:`${apin}/kits_ns/`,
    dashboardtable:`${apin}/dashboard_table/`,

    // Endpoints for Preparatiion
    getPreparation: `${apin}/clab_kit_preparations`,
    postPreparation: `${apin}/clab_kit_preparation`,
    getPreparationById: `${apin}/clab_kit_preparation/`,
    sampleack: `${apin}/sample_ack/`,
    sampleackput: `${apin}/sample_ack`,


}
