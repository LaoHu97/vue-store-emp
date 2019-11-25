import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Index from './pages/index.vue'
import Table from './pages/nav1/Table.vue'
import Table1 from './pages/nav1/Table1.vue'
import Table2 from './pages/nav1/Table2.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import Page6 from './pages/nav2/Page6.vue'

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '我的主页',
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
              { path: '/index', component: Index, name: '我的主页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '交易查询',
        iconCls: 'el-icon-edit-outline',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '交易查询', hidden: true },
            { path: '/table', component: Table, name: '实时交易查询'},
            { path: '/table1', component: Table1, name: '历史交易查询'},
            { path: '/table2', component: Table2, name: '款台汇总查询'},
        ],
    },
    {
        path: '/',
        component: Home,
        name: '悦收银',
        iconCls: 'el-icon-star-on',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '悦收银', hidden: true },
            { path: '/page4', component: Page4, name: '刷卡收款'},
            { path: '/page5', component: Page5, name: '订单退款' },
            { path: '/Page6', component: Page6, name: '收款二维码'},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
