<template>
    <div>
        <button @click="increment">{{ count }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent,Ref,ref } from '@vue/composition-api'

export default defineComponent({
    props:{
        name:String
    },
    setup( props ){
        const count:Ref<number> = ref(0); 
        const increment = () => {
            count.value++ ;
        };
        return {
            count,
            increment,
        };
    }
})
</script>
