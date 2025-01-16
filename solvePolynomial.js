const fs = require('fs');  // Import the fs module to read files

// Function to decode a number from a given base to decimal
function decodeValue(value, base) {
  return parseInt(value, base);
}

// Function to compute Lagrange Interpolation at x = 0 to find constant term c
function lagrangeInterpolationAtZero(points) {
  let result = 0;
  
  // Perform the Lagrange interpolation formula
  for (let i = 0; i < points.length; i++) {
    let [xi, yi] = points[i];
    let term = yi;
    
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let [xj] = points[j];
        term *= (0 - xj) / (xi - xj);
      }
    }
    
    result += term;
  }
  
  return result;
}

// Function to solve the polynomial and find the constant term
function solvePolynomial(data) {
  let n = data.keys.n;
  let k = data.keys.k;
  
  let points = [];
  
  // Step 2: Decode each root (x, y)
  for (let key in data) {
    if (key === "keys") continue;
    
    let base = parseInt(data[key].base);
    let value = data[key].value;
    let decodedY = decodeValue(value, base);
    let x = parseInt(key);
    points.push([x, decodedY]);
  }
  
  // Step 3: Use Lagrange Interpolation to find f(0), the constant term c
  let constantTerm = lagrangeInterpolationAtZero(points);
  
  // Step 4: Return the constant term
  return Math.round(constantTerm);
}

// Reading the input from a JSON file asynchronously
fs.readFile('testcase.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  
  // Parse the JSON data
  const parsedData = JSON.parse(data);
  
  // Compute the constant term for both test cases
  let result = solvePolynomial(parsedData);
  
  // Output the result
  console.log(`Constant term: ${result}`);
});
