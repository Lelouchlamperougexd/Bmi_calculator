// Import required modules
const express = require('express');
const path = require('path'); // Initialize the path
const app = express(); // Initialize the app
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Home route to serve the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// BMI calculation route
app.post('/calculate', (req, res) => {
  const { weight, height, age, gender } = req.body;
  let errorMessage = '';

  // Input validation
  if (!weight || !height || isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    errorMessage = 'Please enter valid positive numbers for weight and height.';
  }

  if (errorMessage) {
    return res.send(`
      <h1>Error</h1>
      <p>${errorMessage}</p>
      <a href="/">Go back</a>
    `);
  }

  // BMI Calculation
  const bmi = (weight / (height * height)).toFixed(2);
  let category = '';

  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal weight';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obesity';

  // Health Tips
  let healthTips = '';
  if (category === 'Underweight') healthTips = 'Consider eating a balanced diet with more calories.';
  else if (category === 'Normal weight') healthTips = 'Keep up the good work maintaining a healthy weight!';
  else if (category === 'Overweight') healthTips = 'Try regular exercise and a balanced diet.';
  else healthTips = 'Consult with a healthcare provider for a personalized plan.';

  
  // Render result
  res.send(`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your BMI Calculator</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body style="text-align:center">
            <h1>Your Personalized BMI Calculator</h1>
            <p>Your BMI: ${bmi}</p>
            <p>Your Diagnosis: ${category}</p>
            <p>Health Tips: ${healthTips}</p>
            <a href="/">Go back</a> 
        </body>
        </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
