const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('we\'re connected!');
    })
    .catch(err => {
        console.log('OH NO!');
        console.log(err);
    });

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    onSale: {
        type: Boolean,
        default: false
    }
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({
    name: 'Helmet',
    price: 59
});

bike.save()
    .then(data => {
        console.log('It Worked!');
        console.log(data);
    })
    .catch(err => {
        console.log('Oh no Error!');
        console.log(err);
    });