const express = require('express');
const film_router=require('./routes/films')
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");


mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


const app = express();
app.use(express.json());

app.use('/api/films',film_router)
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
