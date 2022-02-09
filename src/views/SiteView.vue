<template lang="pug">
template(v-if="user.isAdmin")
  form.border.rounded.bg-white.overflow-hidden(@submit.prevent="updateSite")
    .flex.flex-col.max-w-xs.mx-auto
      .text-xl.py-4 Update Site
      label.mb-2(for="site-title") Title :
      input.mb-4.border.rounded.py-1.px-2(type="text" name="title" id="site-title" v-model="site.title")
    .bg-gray-50.py-2.px-4
      .flex.items-baseline.max-w-xs.mx-auto
        .flex-grow
        button.py-1.px-2.border.rounded.bg-white(type="submit") Update
  .bg-white.divide-y(class="sm:border sm:rounded")
    .bg-gray-50.px-4.py-3.text-xl ข้อสอบทั้งหมด
    .flex.divide-x(v-for="(exam, index) in exams" :key="exam.id")
      .flex-grow.py-2.px-4 {{ exam.title }}
      .py-2.px-4.cursor-pointer(@click.prevent="deleteExam(index)") ลบ
    .p-4(v-if="!exams") ไม่มีข้อสอบในระบบ
  .bg-white.divide-y(class="sm:border sm:rounded")
    .bg-gray-50.px-4.py-3.text-xl ผู้ใช้งานทั้งหมด
    .flex.divide-x(v-for="(user, index) in users" :key="user.id")
      .flex-grow.py-2.px-4 {{ user.displayName }}
      .py-2.px-4.cursor-pointer(@click.prevent="toggleAdminUser(index)") {{ !user?.isAdmin ? 'ตั้งผู้ดูแล' : 'ยกเลิกผู้ดูแล' }}
      .py-2.px-4.cursor-pointer(@click.prevent="toggleBanUser(index)") {{ !user?.banned ? 'แบน' : 'ยกเลิกแบน' }}
    .p-4(v-if="!exams") ไม่มีข้อสอบในระบบ
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getFirestore, doc, setDoc, updateDoc, collection, getDocs, deleteDoc } from '@firebase/firestore'

export default {
  name: 'site-view',
  data () {
    return { site: null, exams: [], users: [] }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setSite']),

    updateSite () {
      return setDoc(doc(getFirestore(), 'sites', 'main'), this.site)
        .then(() => this.setSite(this.site))
        .catch(e => alert(e))
    },

    fetchExams () {
      const addExam = doc => this.exams.push({ id: doc.id, ...doc.data() })
      return getDocs(collection(getFirestore(), 'exams'))
        .then(snapshot => snapshot.forEach(addExam))
        .catch(e => alert(e))
    },

    deleteExam (index) {
      return deleteDoc(doc(getFirestore(), 'exams', this.exams[index].id))
        .then(() => this.exams.splice(index, 1))
        .catch(e => alert(e))
    },

    fetchUsers () {
      const addUser = doc => this.users.push({ id: doc.id, ...doc.data() })
      return getDocs(collection(getFirestore(), 'users'))
        .then(snapshot => snapshot.forEach(addUser))
        .catch(e => alert(e))
    },

    toggleAdminUser (index) {
      const docRef = doc(getFirestore(), 'users', this.users[index].id)
      return updateDoc(docRef, 'isAdmin', !this.users[index]?.isAdmin)
        .then(() => (this.users[index].isAdmin = !this.users[index]?.isAdmin))
        .catch(e => alert(e))
    },

    toggleBanUser (index) {
      const docRef = doc(getFirestore(), 'users', this.users[index].id)
      return updateDoc(docRef, 'banned', !this.users[index]?.banned)
        .then(() => (this.users[index].banned = !this.users[index]?.banned))
        .catch(e => alert(e))
    }
  },
  created () {
    this.site = Object.assign({}, this.$store.state.site)
    this.fetchExams().then(() => this.fetchUsers())
  }
}
</script>
