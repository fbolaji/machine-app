export const routesConfig = [
  {
    label: 'login',
    path: '/login',
    route: 'login',
    component: 'LoginPageComponent',
    menu: 'Login',
    subNav: [
      {
        label: 'view details',
        path: '/view/',
        route: 'view-details',
        component: 'ViewDetails',
      },
    ],
  },
  {
    label: 'list',
    path: '/list',
    route: 'list',
    component: 'AlbumListComponent',
    menu: 'list',
    subNav: [
      {

      },
    ],
  },
]
