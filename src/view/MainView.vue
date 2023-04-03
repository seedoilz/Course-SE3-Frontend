<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
import {analyzeText} from '@/network/main'

export default {
  name: 'MainView',
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    let text = 'fuck'
    analyzeText(text).then(res => {
      if (res.code === 200) {
        this.data = res.data
      } else {
        console.log(res.message)
      }
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
