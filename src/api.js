import axios from "axios";

const backendHost = "https://fuzzy-c-mean-api-production.up.railway.app/api"

// export const getOne = async (tableName, rowId) => {
//     return await axios.get(`${backendHost}/db/get-one/${tableName}/${rowId}`);
// }

export const getAll = async (tableName) => {
    return await axios.get(`${backendHost}/db/get-all/${tableName}`);
}

export const updateRow = async (tableName, data) => {
    return axios.put(`${backendHost}/db/update/${tableName}`, data);
}

// export const addRow = async (tableName, data) => {
//     return await axios.post(`${backendHost}/db/add/${tableName}`, data);
// }

export const deleteRow = async (tableName, rowId) => {
    return await axios.delete(`${backendHost}/db/delete/${tableName}/${rowId}`);
}
