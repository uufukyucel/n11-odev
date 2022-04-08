Vue.component('attribute-area', {
    props: ['title'],
    template: `
    <div class="flex mt-4 gap-2">
        <span class="w-3/12 flex justify-between items-center">
            <span>{{ title }}</span>
            <span>:</span>
        </span>
        <div class="grid grid-cols-3 w-9/12 gap-2">
            <slot></slot>
        </div>
    </div>
    `,
});