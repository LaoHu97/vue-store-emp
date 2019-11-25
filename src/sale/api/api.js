import instance from './index';

const base = '';
const downloadPath = process.env.API_DOWNLOAD || '';

export const requestLogin = params => { return instance.post(`${base}/admin/wp/salesman/loginSalesmanVerify`, params).then(res => res.data); };

//验证码
export const getCode = `${base}/admin/wp/comm/getCode`;

export const queryOrdersBySalesman = params => { return instance.post(`${base}/admin/wp/salesman/queryOrdersBySalesman`, params).then(res => res.data);};

export const getUserListPage = params => { return instance.post(`${base}/admin/wp/salesman/queryMerchantsBySalesman`,params).then(res => res.data); };

export const modifyPassword= params => { return instance.post(`${base}/admin/wp/salesman/updateSalesmanSpwd`, params).then(res => res.data); };

export const batchRemoveUser = params => { return instance.post(`${base}/admin/wp/salesman/loginSalesmanOut`, params).then(res => res.data); };

export const selectMersByName = params => { return instance.post(`${base}/admin/wp/comm/selectMersByName`,params).then(res => res.data); };

export const queryMerStatement = params => { return instance.post(`${base}/admin/wp/salesman/queryMerStatement`,params).then(res => res.data); };

export const downOrderSumExcel = params => { return instance.get(`${base}/admin/wp/salesman/downOrderSumExcel`,{ params: params }); };
//商户日交易统计
export const queryMerDaySum = params => { return instance.post(`${base}/admin/wp/salesman/queryMerDaySum`,params).then(res => res.data); };
