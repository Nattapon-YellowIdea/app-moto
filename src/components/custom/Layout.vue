<template>
    <div :class="classes" >
        <slot></slot>
    </div>
</template>

<script>
export default {
    computed: {
        classes() {
            return {
                'content': true,
            };
        },
    },
}
</script>

<style scoped>
.content {
	position: relative;
    min-height: calc(var(--vh, 1vh) * 100);
    box-shadow: 0px 0px 10px grey;
    background-color: #ffffff;
}
@media only screen and (max-width: 600px) {}
@media only screen and (min-width: 600px) {}
@media only screen and (min-width: 768px) {}
@media only screen and (min-width: 992px) {}
@media only screen and (min-width: 1200px) {
    .content{
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
    }
}
</style>