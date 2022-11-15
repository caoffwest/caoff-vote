import Vue from 'vue'
import VueRouter from 'vue-router'
import TopView from '../views/TopView.vue'
import SongListView from '../views/SongListView.vue'
import VoteView from '../views/VoteView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopView,
    props: true
  },
  {
    path: '/songList',
    name: 'songList',
    component: SongListView,
    props: true
  },
  {
    path: '/vote',
    name: 'vote',
    component: VoteView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
