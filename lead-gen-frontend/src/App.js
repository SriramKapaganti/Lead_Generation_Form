import React,{useState} from 'react'
import "./App.css"

const App = () =>{
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const [error, setErrorMsg] = useState('')
  const [response, setResponse] = useState('')

  const onChangeHandle =  event => {
    setFormData({...formData, [event.target.name]:event.target.value})
  }

  const onSubmission = async event => {
    event.preventDefault()

    if(formData.name === ""){
      setErrorMsg("Name is required")
    }
    if(formData.email === ""){
      setErrorMsg("Email is required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    
  try {
    const response = await fetch('https://lead-generation-form-ld9t.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
   

    const data = await response.json()

    setResponse(data.message || data.error)
    setFormData({
    name: "",
    email: "",
    company: "",
    message: ""
    })
  } catch (error) {
    console.error('Error:', error)
    setResponse('Something went wrong!')
  }
}
  
const handleBlur = (event) => {
  const { name, value } = event.target;

  if (name === 'name' && value.trim() === '') {
    setErrorMsg('Name is required');
  } else if (name === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') {
      setErrorMsg('Email is required');
    } else if (!emailPattern.test(value)) {
      setErrorMsg('Invalid email format');
    } else {
      setErrorMsg('');
    }
  } else {
    setErrorMsg('');
  }
};

  return (
    <div className='Form'>
      <form className='lead-generation-form' onSubmit={onSubmission}>
        <h1 className='Form-heading'>
          Lead Generation Form
        </h1>
       <div className='input-container'>
         <label htmlFor='name' className='label-styling'>NAME</label>
        <input name="name" className='input' value={formData.name} id='name' type='text' onChange={onChangeHandle} onBlur={handleBlur} />
       </div>
        <div className='input-container'>
         <label htmlFor='email' className='label-styling'>EMAIL</label>
        <input name="email" className='input' value={formData.email} id='email' type='text' onChange={onChangeHandle} onBlur={handleBlur} />
       </div>
        <div className='input-container'>
         <label htmlFor='company' className='label-styling'>COMPANY</label>
        <input name="company" className='input' value={formData.company} id='company' type='text' onChange={onChangeHandle} />
       </div>
        <div className='input-container'>
         <label htmlFor='message' className='label-styling'>MESSAGE</label>
        <textarea name="message" className='input' value={formData.message} id='message' type='text' onChange={onChangeHandle} />
       </div>
       <button className='submitBtn' type="submit">Submit</button>
       {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>{response}</p>
    </div>
  )
}

export default App
