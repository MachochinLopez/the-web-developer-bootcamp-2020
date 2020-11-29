const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('we\'re connected!');
    })
    .catch(err => {
        console.log('OH NO!');
        console.log(err);
    });

const personSchema = mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName')
    .get(function () {
        return `${this.first} ${this.last}`;
    });

personSchema.pre('save', async function () {
    this.first = 'YO';
    this.last = 'MAMMA!!';
    console.log('about to save...');
});

personSchema.post('save', async function () {
    console.log('JUST SAVED!');
});

const Person = mongoose.model('Person', personSchema);