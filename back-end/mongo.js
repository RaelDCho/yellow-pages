const mongoose = require('mongoose');

// quit immediately if args !== 5 or 3
if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('Error');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://davidcho123456781_db_user:${password}@cluster0.nvtf0je.mongodb.net/yellowPages?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

// family: 4 = IPv4 connection - mongoose only supports IPv4
mongoose.connect(url, {family: 4});

// if 5 arguments we are adding a person
if (process.argv.length === 5) {
    console.log(5);
    // const personSchema = new mongoose.Schema({
    //     name: String,
    //     number: String
    // });

    // const Person = mongoose.model('Person', personSchema);

    // const person = new Person({
    //     name: 'Inaho Kaizaku',
    //     number: '12-12-1231451'
    // });

    // person.save().then(result => {
    //     console.log('saved!');
    //     mongoose.connection.close();
    // });
} else if (process.argv.length === 3) {
    console.log(3);
    // output all in the database
    // Person.find({}).then(result => {
    //     result.forEach(person => {
    //         console.log(person);
    //         mongoose.connection.close();
    //     });
    // });
} else {
    console.log('Error');
    process.exit(1);
}

mongoose.connection.close();