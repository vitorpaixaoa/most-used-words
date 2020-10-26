<template>

    <v-main fluid>

        <v-form>
            <v-file-input 
                label="Selecione as Legendas"
                prepend-icon="mdi-message-text"
                append-outer-icon="mdi-send"
                outlined
                multiple 
                chips
                v-model="files" 
                @click:append-outer="processSubtitles"
            />
        </v-form>

        <div class="pills">
            <Pill v-for="word in grupedWords" :key="word.name" 
            :name="word.name" :amount="word.amount"/>
            
        </div>

    </v-main>
</template>

<script>
const {ipcRenderer} = window.require('electron')
import Pill from './Pill'


export default {

    components: { Pill },
    data: function() {
            return {
                files:[],
                grupedWords: [] 
            }
        },
        methods: {
            processSubtitles(){
                try {
                    console.log()
                const paths =  this.files.map(f => f.path )
                ipcRenderer.send('process-subtitles',paths)
                ipcRenderer.on('process-subtitles', (event, resp)=>{
                        this.grupedWords = resp
                })
                } catch (e) {
                    console.log(e)
                }
            }
        }
}
</script>

<style>
    .pills{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between; 
    }

</style>

