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
declare var myAppApi: { ping: (value: string) => Promise<string> };

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
        myAppApi.ping('ping').then((value) => {
            // tslint:disable-next-line: no-console
            console.log(value);
        });
    }
}
</script>
