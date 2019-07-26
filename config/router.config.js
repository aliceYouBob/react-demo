export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'home',
        component: './Dashboard/Analysis',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            icon: 'dashboard',
            component: './Dashboard/Analysis',
          },
        ],
      },

      // 招生管理
      {
        path: '/admission',
        name: 'admission',
        icon: 'user',
        routes: [
          {
            path: '/admission/class',
            name: 'class',
            icon: 'team',
            routes: [
              {
                path: '/admission/class/train',
                name: 'train',
                component: './Admission/Class/TrainIndex',
                routes: [
                  {
                    path: '/admission/class/train',
                    redirect: '/admission/class/train/trainList',
                    hideInMenu:true
                  },
                  {
                    path: '/admission/class/train/trainList',
                    component: './Admission/Class/Train',
                    hideInMenu:true
                  },
                  {
                    path: '/admission/class/train/trainList/:id',
                    component: './Admission/Class/TrainDetail',
                    hideInMenu:true
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        name: 'exception',
        icon: 'warning',
        hideInMenu: true,
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            component: './Exception/TriggerException',
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
