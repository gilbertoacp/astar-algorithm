<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
 
      <span class="md-title">{{ appName }}</span>

      <div class="md-toolbar-section-end">
        <md-button @click="instructions = true">How to use?</md-button>
        <md-button @click="state = 'start'" :disabled="isRunning">{{ isRunning ? 'Running': 'Start' }}</md-button>
        <md-button @click="state = 'clear'" :disabled="isRunning">Clear Board</md-button>
      </div>
    </md-toolbar>

    <md-content>
      <md-dialog
        :md-active.sync="instructions"
      >
        <md-dialog-title>How to use?</md-dialog-title>

        <md-list>
          <md-list-item>
            Left Click <code>Set Start</code>
          </md-list-item>
          
          <md-list-item>
            Right Click <code>Set End</code>
          </md-list-item>

          <md-list-item>
            Ctrl + Hover <code>Draw a Wall</code>
          </md-list-item>

          <md-dialog-actions>
          <md-button class="md-primary" @click="instructions = false">OK</md-button>
        </md-dialog-actions>
        </md-list>
      </md-dialog>

      <Legend
        :items="legendItems"
      >
      </Legend>

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
import Legend from './Legend';
import { Colors } from '../helpers';

export default {
   name: 'NavControl',
   data: function() {
    return {
      showNavigation: false,
      showSidepanel: false,
      appName: 'A* PathFinding Visualization',
      state: 'none',
      instructions: false
    }
   },
   components: {
     PathFinding,
     Legend
   },
   computed: {
     isRunning: function() {
       return this.state === 'running';
     },
     legendItems: function() {
       
       let items = [];

       if(this.appName === 'A* PathFinding Visualization') {
         items.push(
           { name: 'Start', value: Colors.ORANGE },
           { name: 'End', value: Colors.TURQUOISE },
           { name: 'Wall', value: Colors.BLACK },
           { name: 'Path', value: Colors.BLUE },
         );
       }

       return items;
     }
   },
   watch: {
     state: function (current) {
       console.log(current);
     }
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