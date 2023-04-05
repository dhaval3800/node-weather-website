const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express();
const port = process.env.PORT || 3000;


// Defines path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views'); // Default value views
const partialPath = path.join(__dirname,'../templates/partials');


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)

// Setup static directory to Serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index', {
        title: 'weather',
        name: 'dhaval'
    })
})





// res.send() is used to send string,html,object,etc.. directly
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must need to provide address'
        })
    }

    const address = req.query.address;

    let location;
    let temp;

    geocode(address,(error, data)=>{
        if(error){
           return res.send({error: error})
        }
    
        forecast(data.latitude,data.longitude,(error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                location: data.location,     
                forecast: forecastdata,
                address: address
            })

        })
    })

    
})



app.get('*',(req, res)=>{
    res.render('404',{
        title: 404,
        name: "dhaval",
        errorMSG: 'page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, ()=>{
    console.log('Serever is up on port '+ port)
})
  