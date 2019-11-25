import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/nav1/Table.vue'
import Table1 from './pages/nav1/Table1.vue'
import Table2 from './pages/nav1/Table2.vue'
import Table3 from './pages/nav1/Table3.vue'
import Table4 from './pages/nav1/Table4.vue'
import Table5 from './pages/nav1/Table5.vue'
import Table6 from './pages/nav1/Table6.vue'
import Index from './pages/index.vue'
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
            { path: '/main', component: Main, name: '交易查询', hidden: true },
            { path: '/table', component: Table, name: '实时交易查询' },
            { path: '/table1', component: Table1, name: '历史交易查询' },
            { path: '/table2', component: Table2, name: '款台汇总查询' },
            { path: '/table3', component: Table3, name: '会员交易查询' },
            { path: '/table5', component: Table5, name: '激活套餐汇总' },
            { path: '/table4', component: Table4, name: '交易账单下载' },
            { path: '/table6', component: Table6, name: '下载列表' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
