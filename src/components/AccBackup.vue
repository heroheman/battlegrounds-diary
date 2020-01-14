<template>
  <div>
    <p>Before every import, the current results will be saved here. This option is limited to 3 objects</p>

    <hr>

    <p>
      You can also create a manual backup:
      <b-button variant="info" size="sm" @click="createBackup">Create Backup</b-button>
    </p>

    <hr>

    <div v-for="backup in resultsBackup.slice().reverse()" :key="backup.id" no-body class="mb-1">
      <p>
        <strong>
        {{ backup.createdAt | moment('from', 'now') }}
        </strong>
        <b-button class="float-right" variant="info" size="sm" @click="downloadBackup(backup.data)">
          Download
        </b-button>
      </p>
      <b-textarea class="mb-4" rows="3" :value="backup.data">
      </b-textarea>

      <hr>
    </div>


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { downloadAsJSON } from '@/helper'

export default {
  name: 'AccBackup',
  computed: {
    ...mapState('history', ['resultsBackup'])
  },
  methods: {
    ...mapActions('history', ['setBackupResults']),
    downloadBackup(data) {
      downloadAsJSON(data)
    },
    createBackup() {
      this.setBackupResults()
        .then(() => this.toast(true))
    },
    toast(append = false) {
      this.$bvToast.toast('Backup created', {
        toaster: 'b-toaster-bottom-center',
        solid: true,
        variant:'success',
        appendToast: append
      })
    }
  }
}
</script>

<style scoped>
textarea {
  font-size: 10px;
}
</style>
