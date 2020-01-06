<template>
  <div class="leaderboard">
    <b-row>
      <b-col>
        <h3 class="h4">Leaderboard</h3>
        <b-tabs small lazy>
          <b-tab title="Heroes">
            <template v-slot:title>
              <unicon class="tab-icon" name="ninja" fill="currentColor" width="18" height="18" />
            </template>
            <b-card class="mt-3" header="All Heroes">
              <b-table
                responsive
                small
                :fields="all.fields"
                :sort-by.sync="all.sortBy"
                :sort-desc.sync="all.sortDesc"
                :items="leaderboardHeroes">
              </b-table>
            </b-card>
          </b-tab>
          <b-tab title="Heroes Top 1 / Top 4">
            <template v-slot:title>
              <unicon class="tab-icon" name="ninja" fill="currentColor" width="18" height="18" />
              1/4
            </template>
            <b-row class="mt-3">
              <b-col sm="12" md="4" class="mb-3">
                <b-card header="Top 1">
                  <b-table
                    responsive
                    small
                    :fields="top1.fields"
                    :sort-by.sync="top1.sortBy"
                    :sort-desc.sync="top1.sortDesc"
                    :items="leaderboardHeroes">
                  </b-table>
                </b-card>
              </b-col>

              <b-col sm="12" md="8" class="mb-3">
                <b-card header="Top 4">
                  <b-table
                    responsive
                    small
                    :fields="top4.fields"
                    :sort-by.sync="top4.sortBy"
                    :sort-desc.sync="top4.sortDesc"
                    :items="leaderboardHeroes">
                  </b-table>
                </b-card>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Tribes">
            <template v-slot:title>
              <unicon class="tab-icon" name="circle" fill="currentColor" width="18" height="18" />
            </template>
            <b-card class="mt-3" header="All Tribes">
              <b-table
                responsive
                small
                :fields="all.fields"
                :sort-by.sync="all.sortBy"
                :sort-desc.sync="all.sortDesc"
                :items="leaderboardTribes">
              </b-table>
            </b-card>
          </b-tab>
          <b-tab title="Tribes Top 1 / Top 4">
            <template v-slot:title>
              <unicon class="tab-icon" name="circle" fill="currentColor" width="18" height="18" />
              1/4
            </template>
            <b-row class="mt-3">
              <b-col sm="12" md="4" class="mb-3">
                <b-card header="Tribes Top 1">
                  <b-table
                    responsive
                    small
                    :fields="top1.fields"
                    :sort-by.sync="top1.sortBy"
                    :sort-desc.sync="top1.sortDesc"
                    :items="leaderboardTribes">
                  </b-table>
                </b-card>
              </b-col>

              <b-col sm="12" md="8" class="mb-3">
                <b-card header="Tribes Top 4">
                  <b-table
                    responsive
                    small
                    :fields="top4.fields"
                    :sort-by.sync="top4.sortBy"
                    :sort-desc.sync="top4.sortDesc"
                    :items="leaderboardTribes">
                  </b-table>
                </b-card>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TableLeaderboard',
  data: () => ({
    all: {
      sortBy: 'points',
      sortDesc: true,
      fields: [
        { key: '1', label: '1' },
        { key: '2', label: '2' },
        { key: '3', label: '3' },
        { key: '4', label: '4' },
        { key: '5', label: '5' },
        { key: '6', label: '6' },
        { key: '7', label: '7' },
        { key: '8', label: '8' },
        { key: 'hero', label: 'Hero' },
        { key: 'points', label: 'Points', sortable: true },
      ]
    },
    top1: {
      sortBy: 'top1',
      sortDesc: true,
      fields: [
        { key: 'top1', label: 'Top 1', sortable: true },
        { key: 'hero', label: 'Hero' },
      ]
    },
    top4: {
      sortBy: 'top4',
      sortDesc: true,
      fields: [
        { key: 'top4', label: 'Top 4', sortable: true },
        { key: 'hero', label: 'Hero' },
        { key: '1', label: '1' },
        { key: '2', label: '2' },
        { key: '3', label: '3' },
        { key: '4', label: '4' },
      ]
    }
  }),
  computed: {
    ...mapGetters('history', [
      'leaderboardHeroes',
      'leaderboardTribes'
    ])
  }
}
</script>
