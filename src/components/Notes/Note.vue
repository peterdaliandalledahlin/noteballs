<template>
  <div class="card mb-4">
        <div class="card-content">
            <div class="content">
                {{ note.content }}
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">{{ dateFormatted }}</small>
                    <small class="column has-text-right">{{ characterLength}}</small>
                </div>
            </div>
        </div>
        <footer class="card-footer">
            <router-link :to="`/edit-note/${note.id}`" href="#" class="card-footer-item">Edit</router-link>
            <a @click.prevent="modals.deleteNote = true" href="#" class="card-footer-item">Delete</a>
        </footer>
        <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
    </div>
</template>

<script setup>
//IMPORTS
    import { computed, reactive } from 'vue'
    import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
    import { useStoreNotes } from '../../stores/storeNotes'
    import { useDateFormat } from '@vueuse/core'

//PROPS
    const props = defineProps({
        note: {
            type: Object,
            required: true
        }
    })

//CHARACTER LENGTH
    const characterLength = computed(() => {
        let description = props.note.content.length > 1 ? 'characters' : 'character'
        return `${props.note.content.length} ${description}`
    })

//STORE
    const storeNotes = useStoreNotes()

//MODALS
    const modals = reactive({
        deleteNote: false
    })

//DATE FORMATTED
    const dateFormatted = computed(() => {
        let date = new Date(parseInt(props.note.date))
        const formattedDate = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
        return formattedDate.value
    })

</script>

<style>

</style>