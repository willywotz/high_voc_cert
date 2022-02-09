<template lang="pug">
.bg-white.divide-y(class="sm:border sm:rounded")
  .bg-gray-50.flex.items-baseline.px-4
    .py-3.text-xl ข้อสอบของฉัน
    .flex-grow
    router-link(to="/exam/new") สร้างข้อสอบ
  .flex.divide-x(v-for="(exam, index) in exams" :key="exam.id")
    .flex-grow.py-2.px-4 {{ exam.title }}
    router-link.py-2.px-4(:to="`/exam/${exam.id}/edit`") แก้ไข
    .py-2.px-4.cursor-pointer(@click.prevent="deleteExam(index)") ลบ
  .p-4(v-if="!exams") ไม่มีข้อสอบ
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  limit,
  getDocs,
  doc,
  deleteDoc,
  where,
  orderBy
} from '@firebase/firestore'
import { mapState } from 'vuex'

export default {
  name: 'exam-view',
  data () {
    return { exams: [] }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    fetchExams () {
      const examsRef = collection(getFirestore(), 'exams')
      const ownerWhere = where('meta.owner', '==', this.user.uid)
      const q = query(examsRef, ownerWhere, orderBy('meta.createdAt'), limit(10))
      const examsAdd = doc => this.exams.push({ id: doc.id, ...doc.data() })

      return getDocs(q)
        .then(snapshot => snapshot.forEach(examsAdd))
        .catch(e => alert(e))
    },
    deleteExam (index) {
      const { id } = this.exams[index]
      const docRef = doc(getFirestore(), 'exams', id)

      return deleteDoc(docRef)
        .then(() => this.exams.splice(index, 1))
        .catch(e => alert(e))
    }
  },
  created () {
    this.fetchExams()
  }
}
</script>
