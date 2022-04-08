Vue.component('price-area', {
    props: ['amount', 'variant'],
    filters: {
        fixedPrice: function(value){
            if(!value) return '';
            return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        }
    },
    template: `
    <div class="p-2">
        <div class="flex gap-2">
            <span class="w-3/12 flex justify-between items-center">
                <span>Toplam</span>
                <span>:</span>
            </span>
            <div class="w-9/12 flex justify-between flex-col">
                <span class="text-3xl">{{ amount | fixedPrice }} ₺</span>
            </div>
        </div>
        <div class="flex gap-2">
            <span class="w-3/12 flex justify-between items-center"></span>
            <div class="w-9/12 flex justify-between flex-col">
                <span class="text-xs font-semibold">
                    Tahmini Kargo Ücreti: Ücretsiz Kargo</span>
            </div>
        </div>
        <div class="flex gap-2 mt-4">
            <span class="w-3/12 flex justify-between items-center">
                <span></span>
            </span>
            <div class="w-9/12 flex gap-4 items-center">
                <span v-show="!variant" class="text-red-500">Bu ürün mevcut değil!</span>
                <button v-show="variant" type="button" class="bg-yellow-400 hover:bg-orange-300 text-white px-8 py-4 whitespace-nowrap rounded">Sepete Ekle</button> 
                <a href="#" class="text-blue-500" v-show="variant">Ödeme Seçenekleri</a>
            </div>
        </div>
    </div>
    `,
});