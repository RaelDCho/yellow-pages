const mongoose = require('mongoose');

// quit immediately if args !== 5 and args !== 3
if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('Error');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://davidcho123456781_db_user:${password}@cluster0.nvtf0je.mongodb.net/yellowPages?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

// family: 4 = IPv4 connection - mongoose only supports IPv4
mongoose.connect(url, {family: 4}).then(result => {
    console.log('Connection success');
});

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

// if 5 arguments we are adding a person
if (process.argv.length === 5) {
    console.log(5);
    
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4].toString()
    });

    person.save().then(result => {
        console.log(`${person.name} (${person.number}) has been saved in the phonebook.`);
        mongoose.connection.close();
    });
} else if (process.argv.length === 3) {
    console.log(3);
    // output all in the database
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} | ${person.number}`);
            mongoose.connection.close();
        });
    });
} else {
    console.log('Error');
    process.exit(1);
}