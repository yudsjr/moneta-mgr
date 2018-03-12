<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-toolbar>
        <v-content>
          <v-container fluid>
            <v-layout
              justify-center
              align-center
            >
              <v-flex xs12 sm6>
                <v-list two-line mt-5>
                  <template v-for="(item, index) in items">
                    <v-list-tile avatar ripple :key="index" @click="">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                        <v-icon color="grey lighten-1">star_border</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
                  </template>
                </v-list>
              </v-flex>
            </v-layout>

          </v-container>
          <v-speed-dial
            v-model="fab"
            direction="top"
            transition="slide-y-reverse-transition"
            style="position: fixed; bottom: 50px; right: 16px;">
            <v-btn
              slot="activator"
              color="blue darken-2"
              dark
              fab
              hover
              v-model="fab"
            >
              <v-icon>account_circle</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="green"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="indigo"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-content>


    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2018 Udel Dela Cruz Jr</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      fab: false,
      drawer: null,
      items: [
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
      ]
    }
  }
}
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .speed-dial {
    position: absolute;
  }

  #create .btn--floating {
    position: relative;
  }
</style>
