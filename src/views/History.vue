<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <FormResult />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Your Journey">
              <TableResults />
            </b-tab>
            <b-tab title="Stats & Graphs (soon)" disabled>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FormResult from '@/components/FormResult'
import TableResults from '@/components/TableResults'
export default {
  name: "History",
  components: {
    FormResult, TableResults
  }
}
</script>
