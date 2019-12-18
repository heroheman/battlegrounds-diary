<template>
  <div>

    <b-row>
      <b-col>
        <FormResult />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-table :items="results">
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FormResult from '@/components/FormResult'
export default {
  name: "History",
  components: {
    FormResult
  }
}
</script>
