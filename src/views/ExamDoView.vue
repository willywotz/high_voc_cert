<template lang="pug">
.border.rounded.bg-white.p-4(v-if="!exam") ไม่พบข้อสอบ {{ $route.params.id }}
form.border.rounded.bg-white.overflow-hidden.divide-y(@submit.prevent="submitExam" v-if="exam && !done")
  .py-3.px-4.bg-gray-50.text-xl {{ exam.title }}
  .flex.flex-col.py-4.px-4(v-for="(question, index) in exam.questions" :key="index")
    .pb-4 {{ index + 1 }}. {{ question.title }}
    .flex.flex-col.border.rounded.overflow-hidden.divide-y
      button.text-left.py-1.px-3(
        v-for="(answer, answer_index) in question.answers"
        :key="answer_index"
        @click.prevent="setResponse(index, answer_index)"
        :class="{'bg-gray-50': response[index] == answer_index}") {{ answer }}
  .flex.py-2.px-4.bg-gray-50
    .flex-grow
    button.py-1.px-2.border.rounded.bg-white(type="submit") ส่งข้อสอบ
.bg-white.overflow-hidden(class='sm:rounded' v-if="done")
  div(class='sm:flex')
    div(class='sm:shrink-0')
      img.h-48.w-full.object-cover(class='sm:h-full sm:w-48' src='@/assets/photo-1554629947-334ff61d85dc.jpeg')
    .p-8
      .tracking-wide.text-sm.text-indigo-500 ทำข้อสอบเสร็จสิ้น
      .mt-1.text-lg.leading-tight {{ exam.title }}
      div ชื่อผู้ใช้งาน {{ user.displayName }}
      div คะแนนที่ได้ {{ done.correctResponse }} / {{ exam.questions.length }} คะแนน
  .bg-gray-50.py-2.px-4.flex
    .flex-grow
    router-link.py-1.px-2.border.rounded.bg-white(to="/") หน้าแรก
</template>

<script>
import { mapState } from 'vuex'
import { getFirestore, doc, getDoc } from '@firebase/firestore'

export default {
  name: 'exam-do-view',
  data () {
    return { exam: null, response: [], done: null }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    fetchExam (id) {
      const setExam = doc => (this.exam = { id: doc.id, ...doc.data() })
      return getDoc(doc(getFirestore(), 'exams', id))
        .then(doc => setExam(doc)).then(() => this.fillAnswer())
        .catch(e => alert(e))
    },

    fillAnswer () {
      const arr = new Array(this.exam.questions.length)
      this.response = [...arr].map(() => null)
    },

    setResponse(index, answer_index) {
      this.response[index] = answer_index
    },

    submitExam () {
      for (let i = 0; i < this.response.length; i++) {
        if (this.response[i] !== null) continue
        return alert(`กรุณาเลือกคำตอบข้อที่ ${i + 1}`)
      }

      let correctResponse = 0
      this.response.forEach((answer, i) => {
        if (this.exam.questions[i].correctAnswer !== i) return
        correctResponse = correctResponse + 1
      })
      this.done = { correctResponse }
    }
  },
  created () {
    this.fetchExam(this.$route.params.id)
  }
}
</script>
