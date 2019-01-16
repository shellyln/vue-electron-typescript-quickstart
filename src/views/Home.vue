<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <button @click="onButtonClick">Send IPC message to main process.</button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

import { IpcRenderer } from 'electron';
declare var ipcRenderer: IpcRenderer;

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    public mounted() {
        // this is component lifecycle event
    }

    public onButtonClick() {
        ipcRenderer.send('views:Home:message-foo', 'ping');
        ipcRenderer.once('views:Home:message-foo', (event: any, arg: any) => {
            // tslint:disable-next-line:no-console
            console.log(arg);
        });
    }
}
</script>
