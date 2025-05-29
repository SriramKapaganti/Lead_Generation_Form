const express = require ('express')
const cors = require ('cors')
const axios = require('axios')


const app = express()
const PORT = 5000

app.use(cors({
  origin: 'https://newleaddetails.netlify.app', // your frontend Netlify domain
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json())

app.post('/submit', async (request,response) => {
  try {
    const { name, email, company, message } = request.body
    if (!name || !email) {
      return response.status(400).json({ error: 'Name and Email are required.' })
    }
    try{  
        const postStatus = await axios.post('http://localhost:5678/webhook/new-lead', {
        name,
        email,
        company,
        message,
    })
    console.log("data recieved")

}catch(e){
        console.log(`errorMsg: ${e.message}`)
    }
    
    console.log("Received Lead:", request.body)
    response.status(200).json({ message: 'Lead submitted successfully!' })
  } catch (error) {
    console.error('Error in /submit:', error)
    response.status(500).json({ error: 'Internal Server Error' })
  }
});

app.get('/', (req, res) => {
    res.send("ready")
})

app.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}`)
} )
