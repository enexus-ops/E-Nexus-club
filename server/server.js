const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const eventRoutes = require('./eventRoutes');
require('dotenv').config()
const { sendContactEmail } = require('./email');
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
const uri = process.env.MONGO_URI

app.use('/api/events', eventRoutes);

app.post('/api/contact', async (req, res) => {
  try {
    const info = await sendContactEmail(req);
    res.json({ ok: true, messageId: info.messageId });
    console.log('Full info:', info);
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

mongoose.connect(uri)
.then(()=>{
    console.log("Database connected successfully")
    app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`)
    })
})