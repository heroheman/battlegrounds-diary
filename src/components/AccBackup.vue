<template>
  <div>
    <p>Before every import, the current results will be saved here. This option is limited to 3 objects</p>

    <hr>

    <div v-for="backup in resultsBackup.slice().reverse()" :key="backup.id" no-body class="mb-1">
      <p>
        <strong>
        {{ backup.createdAt | moment('from', 'now') }}
        </strong>
      </p>
      <b-textarea class="mb-4" rows="3" :value="backup.data">
      </b-textarea>

      <hr>
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AccBackup',
  computed: {
    ...mapState('history', ['resultsBackup'])
  }
}
</script>

<style scoped>
textarea {
  font-size: 10px;
}
</style>
