<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <!-- <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button> -->
      <span class="md-title">{{appName}}</span>

      <div class="md-toolbar-section-end">
        <md-button @click="state = 'start'">Start</md-button>
        <md-button @click="state = 'clear'">Clear Board</md-button>
      </div>
    </md-toolbar>

    <!-- <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">{{appName}}</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>
    </md-drawer> -->

    <md-content>
      <PathFinding 
        :stateControl="state"
        @state="state = $event" 
      >
      </PathFinding>
    </md-content>
  </div>
</template>
<script>

import PathFinding from './PathFinding';

export default {
   name: 'NavControl',
   data: function() {
    return {
      showNavigation: false,
      showSidepanel: false,
      appName: 'A* PathFinding Visualization',
      state: 'none'
    }
   },
   components: {
     PathFinding
   }
 }
</script>

<style scoped>
.page-container {
  height: 100vh;
  width: 100vw;
  position: absolute;
  border: 1px solid rgba(#000, .12);
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-content {
  padding: 0px;
}
</style>