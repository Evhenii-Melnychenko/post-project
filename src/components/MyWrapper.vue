<template>
    <div class="wrapper">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    $color-white:#fff;

    .wrapper {
        margin: 2rem;
        background: $color-white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 10px -3px;
        border-radius: 10px;
    }
</style>