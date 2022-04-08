Vue.component('product-image-area', {
    props: ['prev', 'next'],
    template: `
    <div class="flex gap-2 mt-8">
        <button type="button" @click="prev" class="border-[1px] px-2"><</button>
        <div class="grid grid-cols-5 gap-2">
            <slot></slot>
        </div>
        <button type="button" @click="next" class="border-[1px] px-2">></button>
    </div>
    `
})