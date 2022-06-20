<template>
  <div class="modal is-active p-2">
  <div class="modal-background"></div>
  <div class="modal-card" ref="modalCardRef">
    <header class="modal-card-head">
      <p class="modal-card-title">Delete Note?</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">
      Are you sure you want to delete this Note?
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button" @click="closeModal">Cancel</button>
      <button @click="storeNotes.deleteNote(noteId)" class="button is-danger">Delete</button>
    </footer>
  </div>
  </div>
</template>

<script setup>
//IMPORTS
    import { onMounted, onUnmounted, ref } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { useStoreNotes } from '../../stores/storeNotes'

//STORE
    const storeNotes = useStoreNotes()

//EMITS
    const emit = defineEmits(['update:modelValue'])

//PROPS
    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        noteId: {
            type: Number,
            required: true
        }
    })

//CLOSE MODAL
    const closeModal = () => {
        emit('update:modelValue', false)
    }

//NAVBAR CLOSE OUTSIDE
    const modalCardRef = ref(null)
    onClickOutside(modalCardRef, closeModal )

//KEYBOARD CONTROL

    const handleKeyboard = e => {
        if(e.key === 'Escape') closeModal()

    }

    onMounted(() => {
        document.addEventListener('keyup', handleKeyboard)
    })

    onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyboard)
    })

</script>

<style>

</style>