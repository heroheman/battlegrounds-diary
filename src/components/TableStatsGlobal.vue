<template>
  <div>
    <small>
      Data based on {{ results.length }} Games<br>
    </small>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StatsGlobal',
  computed: {
    ...mapState('history', [
      'results'
    ]),
    top1() {
      return this.results.filter(r => r.placement === '1')
    }
  },
}
</script>
