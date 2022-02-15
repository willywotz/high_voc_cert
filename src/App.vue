<template lang="pug">
.min-h-screen.bg-gray-100(class="sm:p-4" v-if="!user?.banned")
  .mx-auto.max-w-2xl.space-y-4
    .bg-white(class="sm:border sm:rounded")
      .py-8.text-2xl.text-center {{ site.title }}
    .bg-white(class="sm:border sm:rounded" v-if="user")
      .flex.flex-col.divide-y(class="sm:flex-row sm:px-1 sm:divide-x sm:divide-y-0")
        router-link.py-2.px-3(class="hover:bg-gray-50" to="/") หน้าแรก
        router-link.py-2.px-3(class="hover:bg-gray-50" to="/exam") ข้อสอบทั้งหมด
        router-link.py-2.px-3(class="hover:bg-gray-50" to="/my-exam") ข้อสอบของฉัน
        .hidden(class="sm:block sm:flex-grow")
        router-link.py-2.px-3(class="hover:bg-gray-50" to="/user/me") {{ user?.displayName || 'User' }}
        router-link.py-2.px-3(class="hover:bg-gray-50" to="/site" v-if="user.isAdmin") ผู้ดูแล
        a.py-2.px-3(class="hover:bg-gray-50" href="#/auth/logout" @click.prevent="signOut") ออกจากระบบ
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
