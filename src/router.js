import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import ScaffoldView from './views/auth_required/ScaffoldView.vue'
import { isAuthencated } from './jellyfin/api'
import MusicView from './views/auth_required/app_views/MusicView.vue'
import ArtistView from './views/auth_required/app_views/ArtistView.vue'
import AlbumView from './views/auth_required/app_views/AlbumView.vue'
import ArtistDetailView from './views/auth_required/app_views/ArtistDetailView.vue'
import AlbumDetailView from './views/auth_required/app_views/AlbumDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: LoginView },
    /** auth required */
    {
      path: "/",
      component: ScaffoldView,
      children: [
        {
          path: "",
          component: MusicView
        },
        {
          path: "artist",
          component: ArtistView
        },
        {
          path: "artist/detail",
          component: ArtistDetailView
        },
        {
          path: "album",
          component: AlbumView
        },
        {
          path: "album/detail",
          component: AlbumDetailView
        },
      ]
    }
  ],
})

router.beforeEach((to) => {
  const authed = isAuthencated();
  if (to.matched.length === 0) {
    return { path: authed ? "/" : "/login" }
  }
  // 检查用户是否已登录并避免无限重定向
  if (!authed && to.path !== '/login') {
    // 将用户重定向到登录页面
    return { path: '/login' }
  }
})

export default router
