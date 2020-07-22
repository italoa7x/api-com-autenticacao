require('dotenv/config')

const express = require('express')
const routes = require('./routes')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false })) //apenas dados simples
app.use(bodyParser.json())
app.use(routes)
app.listen(process.env.PORT || 3000)


