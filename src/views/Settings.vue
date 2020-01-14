<template>
  <div class="settings">
    <h1 class="mb-4">Settings</h1>
    <h3>Misc</h3>
    <b-form-checkbox
      v-model="darkMode"
      name="checkbox-1"
      value=true
      unchecked-value=false
      switch
      >
      Darkmode (Header only)
    </b-form-checkbox>

    <hr>

    <h3>Import / Export your Data</h3>
    <b-alert show variant="warning">
      <strong>Attention:</strong>
      This is fairly untested. Use at your own risk! Before importing, save the Export Code somewhere else!
    </b-alert>
    <b-tabs card lazy>
      <b-tab title="Export">
        <SettingExport />
      </b-tab>
      <b-tab title="Import">
        <SettingImport />
      </b-tab>
      <b-tab title="Backup">
        <AccBackup />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { mapState, mapMutations } from 'vuex'
import AccBackup from '@/components/AccBackup'
import SettingExport from '@/components/SettingExport'
import SettingImport from '@/components/SettingImport'

export default {
  name: 'Settings',
  components: { AccBackup, SettingExport, SettingImport },
  data: () => ({}),
  computed: {
    ...mapState('settings', [ 'dark']),
    darkMode: {
      set(val) { this.TOGGLE_DARKMODE(val) },
      get() { return this.dark }
    }
  },
  methods: {
    ...mapMutations('settings', ['TOGGLE_DARKMODE'])
  }
}
</script>
