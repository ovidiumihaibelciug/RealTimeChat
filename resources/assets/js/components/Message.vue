<template>
    <div>
        <li class="list-group-item" :class="className">
            <slot></slot>
            <small class="pull-right">{{ time }}</small>
        </li>
        <span class="badge badge-primary">{{ user }}</span>

    </div>
</template>

<script>
    export default {
        props:['color', 'user', 'time'],
        computed: {
            className() {
                return 'list-group-item-' + this.color;
            },
        },
    }
</script>
