import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Index from './pages/Index.vue'
import Table from './pages/nav1/Table.vue'
import Table2 from './pages/nav1/Table2.vue'
import Table3 from './pages/nav1/Table3.vue'
import Table4 from './pages/nav1/Table4.vue'

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
        name: '商户管理',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/main', component: Main, name: '商户管理', hidden: true },
            { path: '/table', component: Table, name: '商户列表' },
            { path: '/table2', component: Table2, name: '支付列表' },
            { path: '/table3', component: Table3, name: '账单下载' },
            { path: '/table4', component: Table4, name: '商户日交易统计' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
