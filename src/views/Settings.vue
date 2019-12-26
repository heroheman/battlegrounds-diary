<template>
  <div class="settings">
    <h1 class="mb-4">Settings</h1>
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
import AccBackup from '@/components/AccBackup'
import SettingExport from '@/components/SettingExport'
import SettingImport from '@/components/SettingImport'
export default {
  name: 'Settings',
  components: { AccBackup, SettingExport, SettingImport },
}
</script>

<style scoped>
textarea {
  font-size: 10px;
}
</style>
