<template>
  <div class="card p-4 mb-5" :class="`has-background-${ bgColor }-dark`">
      <label v-if="label" class="label has-text-white">{{ label }}</label>
        <div class="field">
            <div class="control">
                <textarea
                    v-model="modelValue"
                    @input="$emit('update:modelValue', modelValue)"
                    class="textarea"
                    :placeholder="placeholder"
                    ref="textareaRef"
                    maxlength="100"
                    v-autofocus
                >
                </textarea>
            </div>
        </div>

        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons" />
            </div>
        </div>
      </div>
</template>

<script setup>
//IMPORTS
    import { ref } from 'vue'
    import { vAutofocus } from '../../directives/vAutofocus'

//PROPS
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        },
        bgColor: {
            type: String,
            default: 'success'
        },
        placeholder: {
            type: String,
            default: 'Type something...'
        },
        label: {
            type: String,
        }
    })

//EMITS
    const emit = defineEmits(['update:modelValue'])

//FOCUS TEXT AREA
    const textareaRef = ref(null)
    
    const focusTextarea = () => {
        textareaRef.value.focus()
    }

    defineExpose({
        focusTextarea
    })

</script>

<style>

</style>