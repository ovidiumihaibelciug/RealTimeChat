<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot> {{ user }}</li>
        <span>{{ user }}</span>
    </div>
</template>

<script>
    export default {
        props:['color', 'user'],
        computed: {
            className() {
                return 'list-group-item-' + this.color;
            },
        },
    }
</script>
