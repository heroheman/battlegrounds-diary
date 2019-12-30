<template>
  <div>
    <b-row>
      <b-col>
        <b-alert show variant="info">
          <h4>What is this?</h4>
          <p>The "Full Stats" in Battlegrounds are missing one Key Feature: <strong>Total Games Played</strong>. This is an attempt to get this number - and some more.</p>
          <p>The calculation is based on the number of <em>Tavern Upgrades</em>. Most of the time, a player reaches level 4 or 5 before he wins or gets eliminated.
            Depending on your own estimation you can also adjust the base value.</p>
          <p>
            <label for="atu"><strong>Average Tavern Upgrades</strong></label>
            <b-input id="atu" v-model="averageTavernUpgrades"></b-input>
          </p>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6" class="mb-4">
        <b-card title="Add your data" tag="section">
          <b-form>
            <b-row>
              <b-col sm="12" md="6">
                <label for="upgrades">
                  Tavern Upgrades
                  <Popover
                    label="?"
                    title="Why is this so important?"
                    text="This is the most important value for the calculation - as it is the only reliable indicator for the total number of games. Most of the time, a player reaches level 4 or 5 to win or eliminate. Depending on your own estimation you can also adjust the base value. The default is 4.5"
                  />
                </label>
                <b-input
                  id="upgrades"
                  v-model="upgrades"
                  type="number"
                  required
                  placeholder="Required"
                  >
                </b-input>
                <b-form-text class="mb-3">Amount of tavern upgrades</b-form-text>

                <!-- <b-alert show variant="primary"> -->
                <!--   This is the most important value for the calculation - as it is the only reliable indicator for the total number of games. Most of the time, a player reaches level 4 or 5 to win or eliminate. Depending on your own estimation you can also adjust the base value. The default is 4.5 -->
                <!-- </b-alert> -->
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="top4-group"
                  label="Top 4"
                  label-for="top4"
                  description="Your Top 4's"
                  >
                  <b-form-input
                    id="top4-1"
                    v-model="top4"
                    type="number"
                    required
                    placeholder="Required"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="first-group"
                  label="First"
                  label-for="first"
                  description="How many times did you have Brann before any other player"
                  >
                  <b-form-input
                    id="first"
                    v-model="first"
                    type="number"
                    required
                    placeholder="Required"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <hr>

            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="minions-group"
                  label="Minions Destroyed"
                  label-for="minions-destroyed"
                  >
                  <b-form-input
                    id="minions-destroyed"
                    v-model="minionsKilled"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="players-group"
                  label="Players eliminated"
                  label-for="players"
                  >
                  <b-form-input
                    id="players"
                    v-model="playersKilled"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="12" md="6">
                <b-form-group
                  id="triples-group"
                  label="Triples created"
                  label-for="triples"
                  >
                  <b-form-input
                    id="triples"
                    v-model="triplesCreated"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="12" md="6">
                <b-form-group
                  id="time-group"
                  label="Time played (in h)"
                  label-for="time"
                  >
                  <b-form-input
                    id="time"
                    v-model="timePlayed"
                    type="number"
                    >
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>


          </b-form>
        </b-card>
      </b-col>

      <b-col sm="12" md="6" class="mb-4">
        <b-card class="mb-3" header="Results" tag="section" header-bg-variant="default">
          <div v-if="upgrades !== ''">
            <dl>
              <dt>Games Played: </dt>
              <dd>{{ amount }} Games</dd>

              <dt>Average Wins:</dt>
              <dd>{{ winsOne }}%</dd>

              <dt>Average Top4:</dt>
              <dd>{{ winsFour }}%</dd>
            </dl>

            <hr>

            <dl>
              <dt>Average Minions destroyed:</dt>
              <dd>{{ killedMinions }} per Match</dd>

              <dt>Average Players destroyed</dt>
              <dd>{{ killedPlayers }} per Match</dd>

              <dt>Average triples</dt>
              <dd>{{ triples }} per Match</dd>

              <dt>Average time / Match</dt>
              <dd>{{ time }} Minutes</dd>
            </dl>
          </div>

          <div v-else>No Data</div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Popover from '@/components/Popover'
import { mapFields } from 'vuex-map-fields'

export default {
  name: "Calculator",
  components: { Popover },
  computed: {
    ...mapFields('calculator', [
      'averageTavernUpgrades',
      'top4',
      'first',
      'upgrades',
      'minionsKilled',
      'triplesCreated',
      'playersKilled',
      'timePlayed',
    ]),
    amount: function () {
      return this.precise(this.upgrades / this.averageTavernUpgrades)
    },
    winsOne: function () {
      return this.precise((this.first * 100) / this.amount)
    },
    winsFour: function () {
      return this.precise((this.top4 * 100) / this.amount)
    },
    killedMinions: function () {
      return this.precise(this.minionsKilled / this.amount)
    },
    killedPlayers: function () {
      return this.precise(this.playersKilled / this.amount)
    },
    triples: function () {
      return this.precise(this.triplesCreated / this.amount)
    },
    time: function () {
      return this.precise((this.timePlayed * 60) / this.amount)
    },
  },
  methods: {
    precise: function (x) {
      return Number.parseFloat(x).toPrecision(4);
    },
  }
}
</script>

<style scoped>
</style>
