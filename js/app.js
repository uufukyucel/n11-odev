const productDetailApp = new Vue({
    el: '#product-detail',
    name: 'ProductDetail',
    data: {
        product: {},
        minQuantity: 0,
        count: 0,
        minCount: 0,
        maxCount: 0,
        totalAmount: 0,
        selectedAttributes: [],
        variantId: 0,
        variantAttrs: [],
        mainImage: '',
        currentBarem: null,
        currentImageIndex: 0,
        productImages: [],
        baremMin: 0,
        baremMax: 0,
        hasVariant: true,
    },
    methods: {
        prevBtn: function(){
            if(this.currentImageIndex > 0){
                this.currentImageIndex = this.currentImageIndex - 1;
            }   
        },
        nextBtn: function(){   
            if(this.currentImageIndex < this.productImages.length - 1){  
                this.currentImageIndex = this.currentImageIndex + 1;
            }
        },
        changeImage: function(index){
            this.currentImageIndex = index;
        },
        setBarem: function(barem, count, clicked) {
            this.count = clicked ? barem.minimumQuantity : count;
            this.currentBarem = barem;
            this.totalAmount = this.count * barem.price;
        },
        getProductDetail: async function(){
            await fetch('./data/product-data.json')
                .then(response => response.json())
                .then(data => {
                    this.product = data;
                    this.initProduct(data);
                });
        },
        getBarem: function(){
            return this.product.baremList;
        },
        initProduct: function(data){
            this.minQuantity = data.baremList[0].minimumQuantity;
            this.count = this.minQuantity;
            this.minCount = this.minQuantity;
            this.maxCount = data.baremList[data.baremList.length-1].maximumQuantity;
            if(this.maxCount === Math.pow(2, 31)-1){
                this.maxCount = data.baremList[data.baremList.length-1].minimumQuantity + '+';
            }
            this.totalAmount = this.minQuantity * data.baremList[0].price;
            this.pickableAttrs();
            this.initVariant();
            this.baremMinMax();
            this.variantId = this.product.productVariants[0].id;
        },
        initVariant: function(){
            this.variantId = this.variantAttrs[0].id;
            this.findImages();
            this.product.productVariants[0].attributes.forEach(attr => {
                let model = {
                    attribute: attr.name,
                    value: attr.value,
                }
                if(attr.selectable)
                    this.selectedAttributes.push(model);
            });
        },
        findImages: function(){
            this.product.productVariants.forEach(variant => {
                if(variant.id == this.variantId){
                    this.mainImage = variant.images[this.currentImageIndex];
                    this.productImages = variant.images;
                }
            });
        },
        selectVariant: function(){
            this.hasVariant = false;
            this.variantAttrs.forEach(variant => {
                if(this.areEqual(this.selectedAttributes, variant.attributes)){
                    this.variantId = variant.id;
                    this.findImages();
                    this.hasVariant = true;
                }
            });
        },
        areEqual: function(array1, array2) {
            if (array1.length === array2.length) {
                if(JSON.stringify(array1) === JSON.stringify(array2)){
                    return true;
                }else if(JSON.stringify(array1) === JSON.stringify(array2.reverse())){
                    return true;
                }
            }
            return false;
          },
        pickableAttrs: function(){
            this.product.productVariants.forEach(variant => {
                let variantModel = {
                    id: variant.id,
                    attributes: [],
                };
                variant.attributes.forEach(attribute => {
                    let attrs = {
                        attribute: attribute.name,
                        value: attribute.value,
                    }
                    variantModel.attributes.push(attrs);
                });
                this.variantAttrs.push(variantModel);
            });
        },
        selectAttr: function(attribute, value){
            this.selectedAttributes.forEach(attr => {
                if(attr.attribute === attribute.name){
                    attr.value = value;
                }
            });
            this.selectVariant();
        },
        attributePicker: function(attribute, value){
            let found = false;
            this.selectedAttributes.forEach(attr => {
                if(attr.attribute === attribute.name && attr.value === value){
                    found = true;
                }
            });
            return found;
        },
        baremMinMax: function(){
            let min = this.product.baremList[0].price;
            let max = 0;
            this.product.baremList.forEach(barem => {
                if(barem.price > max){
                    max = barem.price;
                }
                if(barem.price < min){  // if(barem.price < min && barem.minimumQuantity > this.minQuantity){
                    min = barem.price;
                }
            });
            this.baremMin = min;
            this.baremMax = max;
        },
        showBasket: function(){
            console.log('attributes:', this.selectedAttributes);
            console.log('barem:', this.currentBarem);
            console.log('productId:', this.variantId);
        }
    },
    watch: {
        currentImageIndex: function(){
            this.mainImage = this.productImages[this.currentImageIndex];
        },
    },
    created: function(){
        this.getProductDetail();
    },
})