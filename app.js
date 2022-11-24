const express = require('express') // variable to give access to express module
const path = require('path') // variable to give access to path module
const stocks = require('./stocks') // variable to give to access stocks.js module

const app = express() // call the object to create an express application (can then access properties and functions of the application object)

//Setting up middleware for application
app.use(express.static(path.join(__dirname, 'static'))) 

//function to call the stocks.getStocks function to display available stocks
//returns an array of each stock, a promise
app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  console.log(stockSymbols); //checking for call
  res.send({ stockSymbols })
})

//function to call the stocks.getStockPoints function to display the data for an individual stock
app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  const data = await stocks.getStockPoints(symbol, new Date())
  res.send(data)
})

app.listen(3000, () => console.log('Server is running!'))