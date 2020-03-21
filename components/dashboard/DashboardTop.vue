<template>
  <div class="dashboard-top d-flex justify-space-between">
    <DashboardTopCard />
    <DashboardTopCard />
    <DashboardTopCard />
    <div class="d-flex flex-column align-space-between" style="height: 174px;">
      <span><v-icon class="mr-2">mdi-tab</v-icon>Notification</span>
      <v-btn class="d-block" rounded style="color: blue; border: 1px solid blue;">
        Refer & Earn
      </v-btn>
      <v-btn dark color="red" class="d-block" rounded>
        Gmail Connected
      </v-btn>
      <v-btn dark color="#6b79ed" class="d-block" rounded @click.stop="dialog = true">
        (+) Add People
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Add People
          </v-card-title>

          <v-card-actions class="d-flex justify-center">
            <label
              class="default-file-upload"
              for="image"
            >
              Upload CSV
              <input
                id="image"
                placeholder="Upload Image"
                type="file"
                name="image"
              >
            </label>
            <v-btn
              color="primary"
              text
              @click.stop="dialog2 = true"
            >
              Add Manually
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog2"
        width="500"
      >
        <v-card>
          <ClientForm />
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import DashboardTopCard from './DashboardTop/DashboardTopCard'
import ClientForm from '~/components/dashboard/ClientForm'
export default {
  components: {
    DashboardTopCard,
    ClientForm
  },
  data () {
    return {
      dialog: false,
      dialog2: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
