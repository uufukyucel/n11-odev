Vue.component('barem-area', {
    props: ['barems', 'count', 'currentBarem', 'min', 'max'],
    methods: {
        setBarem: function(barem, clicked) {
            this.$emit('set-barem', barem, this.count, clicked);
        },
    },
    watch: {
        count: function(newVal) {
            this.barems.forEach(barem => {
                if(barem.minimumQuantity <= newVal && barem.maximumQuantity >= newVal) {
                    this.setBarem(barem)
                }
            });
        }
    },
    template: `
    <div class="bg-gray-100 mt-2 p-2">
        <div class="flex gap-2 text-sm">
            <span class="w-3/12">
                <div class="flex justify-between items-center">
                    <span>Toptan Fiyat</span>
                    <span>:</span>
                </div>
                <span>(Adet)</span>
            </span>
            <div class="grid grid-cols-4 w-9/12 gap-2">
                <button type="button" :class="['border-r-[1px] border-gray-300 text', {'bg-yellow-100' : barem.minimumQuantity<=count && count<=barem.maximumQuantity}]" v-for="(barem, index) in barems" @click="setBarem(barem, true)" :key="index">
                    <span class="text-xs">{{ barem.minimumQuantity }} {{ barem.maximumQuantity === Math.pow(2, 31)-1 ? '+' : '- ' + barem.maximumQuantity }}</span> <br>
                    <span>{{ barem.price }} ₺</span>
                </button>
            </div>
        </div>
        <div class="flex mt-4 gap-2">
            <span class="w-3/12 flex justify-between items-center">
                <span>Adet</span>
                <span>:</span>
            </span>
            <div class="w-9/12 flex justify-between">
                <div>
                    <input type="number" :min="min" class="w-16 border-gray-300 border-2 rounded-sm" v-model="count">
                    <span>Adet</span>
                </div>
                <span class="text-sm text-green-500">Stok Adedi: <b>{{max}}</b></span>
            </div>
        </div>
    </div>
    `,
});