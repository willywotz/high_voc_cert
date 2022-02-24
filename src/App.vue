<template lang="pug">
.min-h-screen(v-if="!user?.banned")
  .bg-gray-800
    .max-w-2xl.mx-auto.px-4.py-2
      .leading-none.text-white.text-xl Loire
      .leading-none.text-gray-300 ระบบคลังข้อสอบออนไลน์
  .bg-white.border-b(v-if="user")
    .max-w-2xl.mx-auto.px-4.py-2
      .flex.space-x-4
        router-link(class="hover:bg-blue-50" to="/") หน้าแรก
        router-link(class="hover:bg-blue-50" to="/exam") ข้อสอบทั้งหมด
        router-link(class="hover:bg-blue-50" to="/my-exam") ข้อสอบของฉัน
        .flex-grow
        router-link(class="hover:bg-blue-50" to="/user/me") {{ user?.displayName || 'User' }}
        router-link(class="hover:bg-blue-50" to="/site" v-if="user.isAdmin") ผู้ดูแล
        a(class="hover:bg-blue-50" href="#/auth/logout" @click.prevent="signOut") ออกจากระบบ
  .bg-gray-100
    .max-w-2xl.mx-auto.px-4.py-8
      .text-xl.capitalize {{ $route.name }}
  .bg-white
    .max-w-2xl.mx-auto.p-4
      router-view
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth'
import { getFirestore, doc, getDoc } from '@firebase/firestore'

export default {
  name: 'app',
  computed: {
    ...mapState(['site', 'user']),
  },
  methods: {
    ...mapMutations(['setSite', 'setUser']),

    signOut () {
      return signOut(getAuth())
    },
  },
  watch: {
    user (newUser) {
      this.$router.push(newUser ? '/' : '/auth/login')
    }
  },
  created () {
    return Promise.resolve()
      .then(() => onAuthStateChanged(getAuth(), user => {
        if (!user) {
          return this.setUser(user)
        }

        return getDoc(doc(getFirestore(), 'users', user.uid))
          .then(snap => Object.assign({}, user, snap.data()))
          .then(user => this.setUser(user))
      }))
      .then(() => getDoc(doc(getFirestore(), 'sites', 'main')))
      .then(snap => Object.assign({}, this.site, snap.data()))
      .then(site => this.setSite(site))
      .catch(e => alert(e))
  },
  beforeMount () {
    !this.user && this.$router.push('/auth/login')
  }
}
</script>
