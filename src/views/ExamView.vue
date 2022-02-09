<template lang="pug">
.bg-white.divide-y(class="sm:border sm:rounded")
  .py-3.px-4.bg-gray-50.text-xl ข้อสอบทั้งหมด
  router-link.block.py-2.px-4(
    class="hover:bg-gray-50"
    v-for="exam in exams"
    :key="exam.id"
    :to="`/exam/${exam.id}/do`"
  ) {{ exam.title }}
  .p-4(v-if="!exams") ไม่มีข้อสอบในระบบ
</template>

<script>
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from '@firebase/firestore'

export default {
  name: 'exam-view',
  data () {
    return { exams: [] }
  },
  methods: {
    fetchExams () {
      const examsRef = collection(getFirestore(), 'exams')
      const examsAdd = doc => this.exams.push({ id: doc.id, ...doc.data() })

      return getDocs(query(examsRef, orderBy('meta.createdAt')))
        .then(snapshot => snapshot.forEach(examsAdd))
        .catch(e => alert(e))
    }
  },
  created () {
    this.fetchExams()
  }
}
</script>
