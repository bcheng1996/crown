import Axios from 'axios';

const IP = '13.72.52.80';
const port = 3000;

const config = {
  headers : { 'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWQiOjEsInRpbWUiOiIyMDE5LTA1LTA3VDE5OjM0OjA4LjYxM1oiLCJpYXQiOjE1NTcyNTc2NDh9.egnrk3QHtD9pD9XdDlF5v526oTuxPFN4ew2T7djN61A' }
};

export function submitToTable(route, data) {
  return new Promise(function(resolve, reject) {
      Axios.post('http://' + IP + ':' + port + '/api/' + route + '/create', data, config)
        .then(function(response) {
          console.log(route + " data inserted in database!");
          //console.log(response.data);
          resolve();
        }).catch(function(error) {
          reject(error);
        })
    })
}


export function submitForm(farmcode, formname, data) {
  return new Promise(function(resolve, reject){
      
      Axios.post('http://' + IP + ':' + port + '/api/soilstep/create', 
      {
        created_date : new Date().toISOString(),
        [formname] : data
      }, config)
       .then(function(response) {
         console.log("Form submission successful!");
         console.log(response.data);
         resolve();
       }).catch(function(error){
         reject(error);
       })
 
     })
}

export function updateSoilStep(barcode, formname, data) {
  return new Promise(function(resolve, reject){
      Axios.put('http://' + IP + ':' + port + '/api/' + formname + '/update/' + barcode, data, config)
        .then(function(response){
          console.log("Soil step successfully updated!");
          console.log(response.data);
          resolve();
        }).catch(function(err){
          reject(err);
        })
  })
}

export function updateForm(barcode, formname, data) {
  return new Promise(function(resolve, reject){
    console.log('http://' + IP + ':' + port + '/api/soilstep/update/' + barcode);

      Axios.put('http://' + IP + ':' + port + '/api/soilstep/update/' + barcode, data, config)
        .then(function(response){
          console.log("Soil data successfully updated!");
          console.log(response.data);
          resolve();
        }).catch(function(error){
          reject(error);
        })
  })
}

export function errorHandling(err, infoType, ErrorLog) {
    return new Promise(function(resolve, reject) {
        console.log("Failed to insert " + infoType + " data.");
        //console.log(err.response)
        var error = {};
        
        if (err.response) {
          error.message = 'Response returned with status code ' + err.response.status;
          error.data = err.response.data;
        } else if (err.request) {
          error.message = "Request could not be made.";
          error.data = err.request;
        } else {
          error.message = err.message;
        }
  
        ErrorLog.errors.push(error);
  
        for (let i = 0; i < ErrorLog.errors.length; i++) {
          if (ErrorLog.errors[i].message) {
            console.log(ErrorLog.errors[i].message);
          }
          if (ErrorLog.errors[i].data) {
            console.log(ErrorLog.errors[i].data);
          }
        }
  
        resolve();
      });
}
