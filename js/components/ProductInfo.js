Vue.component('product-info', {
    props: ['min', 'max', 'quantity'],
    filters: {
        fixedPrice: function(value){
            console.log(value)
            if(!value) return '';
            return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        }
    },
    template: `
    <div class="text-xl mt-4">
        <span>{{ min | fixedPrice}} ₺ </span> - <span> {{ max| fixedPrice }} ₺ </span> <span class="text-sm text-gray-400"> / Adet </span>
        <div class="text-sm text-gray-400">{{ quantity }} Adet (Minimum sipariş adedi)</div>
    </div>
    `,
});