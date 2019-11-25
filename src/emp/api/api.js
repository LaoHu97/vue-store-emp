import instance from './index';

const base = '';
const downloadPath = process.env.API_DOWNLOAD || '';
//款台登录
export const loginEmpVerify = params => { return instance.post(`${base}/admin/wp/emp/loginEmpVerify`, params).then(res => res.data); };
//验证码
export const getCode = `${base}/admin/wp/comm/getCode`;

export const getTwoCode = `${base}/admin/wp/emp/getTwoCode`;

export const getVariableCode = `/admin/wp/emp/getVariableCode`;
//款台列表
export const queryOrderShop = params => { return instance.post(`${base}/admin/wp/emp/queryOrderShop`, params).then(res => res.data); };
//汇总查询
export const queryEmplSummary = params => { return instance.post(`${base}/admin/wp/emp/queryEmplSummary`, params).then(res => res.data); };
//款台退出
export const loginEmpOut = params => { return instance.post(`${base}/admin/wp/emp/loginEmpOut`, params).then(res => res.data); };
//刷卡收款（类型为3）
export const scanpayNew = params => { return instance.post(`${base}/admin/wp/emp/scanpayNew`, params).then(res => res.data); };
//刷卡收款（类型为5）
export const bigBarcodepayNew = params => { return instance.post(`${base}/admin/wp/emp/bigBarcodepayNew`, params).then(res => res.data); };
//刷卡收款（类型为1）
export const micropayNew = params => { return instance.post(`${base}/admin/wp/emp/micropayNew`, params).then(res => res.data); };
//退款（类型为3）
export const payRefundNew = params => { return instance.post(`${base}/admin/wp/emp/payRefundNew`, params).then(res => res.data); };
//退款（类型为5）
export const refundNew = params => { return instance.post(`${base}/admin/wp/emp/refundNew`, params).then(res => res.data); };
//退款（类型为1）
export const micropayRefundNew = params => { return instance.post(`${base}/admin/wp/emp/micropayRefundNew`, params).then(res => res.data); };
//修改密码
export const updateEmpMpwd = params => { return instance.post(`${base}/admin/wp/emp/updateEmpMpwd`, params).then(res => res.data); };
//补发打印
export const supplyPrint = params => { return instance.post(`${base}/admin/wp/emp/supplyPrint`,params).then(res => res.data); };
//订单详情
export const queryOrderDetail = params => { return instance.post(`${base}/admin/wp/emp/queryOrderDetail`,params).then(res => res.data); };

export const downloadQueryOrderShop = params => { return instance.post(`${downloadPath}/download/emp/queryOrderShop`,params).then(res => res.data); };

export const downloadQueryOrderDetail = params => { return instance.post(`${downloadPath}/download/emp/queryOrderDetail`,params).then(res => res.data); };