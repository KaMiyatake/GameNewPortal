import express from 'express'; 
import cors from 'cors'; 
const app = express(); 
const port = 3001; 
 
app.use(cors()); 
app.use(express.json()); 
 
app.get('/', (req, res) => { 
    res.send('Hello from Express + TypeScript!'); 
  }); 
   
app.listen(3001, () => console.log('API on :3001')); 
 
app.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}`); 
}); 