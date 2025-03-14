const mongoose = require('mongoose');

// Cadena de conexión a MongoDB Atlas
const URI = process.env.MONGODB_URI || 'mongodb+srv://rubenmariscalgil:Ruben12112003@cluster0.eabtu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('La base de datos ha sido conectada: ', URI))
    .catch(error => console.error('Error al conectar con la base de datos:', error));


// const connection = mongoose.connection;
// connection.once('open', ()=>{
//     console.log('La base de datos ha sido conectada: ', URI);
// });
