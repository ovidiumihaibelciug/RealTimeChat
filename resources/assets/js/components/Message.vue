<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot></li>
        <span class="badge badge-primary">{{ user }}</span>
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
