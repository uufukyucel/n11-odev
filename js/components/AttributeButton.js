Vue.component('attribute-button', {
    props: ['attribute', 'text', 'checked'],
    methods: {
        selectAttribute: function(attribute) {
            this.$emit('select-attr', attribute, this.text);
        }
    },
    template: `
        <button type="button" @click="selectAttribute(attribute)" :class="['rounded-sm text-center px-4 hover:border-gray-500 min-h-[40px] text-sm', {'border-2 border-gray-700 font-semibold' : checked}, {'border-[1px]' : !checked}]">{{ text }}</button>
    `,
});