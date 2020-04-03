const dotenv = require('dotenv');
dotenv.config();
const app = require('./src/app');

app.listen(8888,()=>{console.log('server running on port 8888')});