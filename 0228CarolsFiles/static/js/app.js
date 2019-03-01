// from data.js
var tableData = data;

var tbody = d3.select("tbody");
var table = d3.select("#ufo-table");
//Select the filter button
var filter_button = d3.select("#filter-btn");

//create array for cities, states, countries, shapes
var cities = [];
var states = [];
var countries = [];
var shapes = [];

tableData.forEach((sitingReport) => {
    var row = tbody.append("tr");
    Object.entries(sitingReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
    //build the cities array to populate combo box later
    cities.push(sitingReport.city);
    //build the states array to populate combo box later
    states.push(sitingReport.state);
    //build the countries array to populate combo box later
    countries.push(sitingReport.country);
    //build the shapes array to populate combo box later
    shapes.push(sitingReport.shape);
});

//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
//getting the unique cities in the cities array
var unique_cities = cities.filter((value, index, array) => array.indexOf(value) === index).sort();
console.log(unique_cities);

//get unique_states in the states array
var unique_states = states.filter((value, index, array) => array.indexOf(value) === index).sort();
console.log(unique_states);

//get unique_countires in the countries array
var unique_countries = countries.filter((value, index, array) => array.indexOf(value) === index).sort();
console.log(unique_countries);

//get unique_shapes in the shapes array
var unique_shapes = shapes.filter((value, index, array) => array.indexOf(value) === index).sort();
console.log(unique_shapes);


var citySelect = d3.select("#citySelect");
unique_cities.forEach((city) => {
    var option = citySelect.append("option");
    option.text(city);
});

var stateSelect = d3.select("#stateSelect");
unique_states.forEach((state) => {
    var option = stateSelect.append("option");
    option.text(state);
});

var countrySelect = d3.select("#countrySelect");
unique_countries.forEach((country) => {
    var option = countrySelect.append("option");
    option.text(country);
});

var shapeSelect = d3.select("#shapeSelect");
unique_shapes.forEach((shape) => {
    var option = shapeSelect.append("option");
    option.text(shape);
});

//event handler for filter button click event
filter_button.on("click", function () {
    d3.event.preventDefault();

    var dateElement = d3.select('#datetime');
    var cityElement = d3.select('#citySelect');
    var stateElement = d3.select('#stateSelect');
    var countryElement = d3.select('#countrySelect');
    var shapeElement = d3.select('#shapeSelect');

    var dateValue = dateElement.property('value');
    var cityValue = cityElement.property('value');
    var stateValue = stateElement.property('value');
    var countryValue = countryElement.property('value');
    var shapeValue = shapeElement.property('value');

    var filterData = tableData;
    if (dateValue.length > 0){
        filterData = filterData.filter(item => item.datetime === dateValue);
    }
    if (cityValue.length > 0){
        filterData = filterData.filter(item => item.city === cityValue);
    }
    if (stateValue.length > 0){
        filterData = filterData.filter(item => item.state === stateValue);
    }
    if (countryValue.length > 0){
        filterData = filterData.filter(item => item.country === countryValue);
    }
    if (shapeValue.length > 0){
        filterData = filterData.filter(item => item.shape === shapeValue);
    }

    // to test if filterData is correct
    console.log(filterData);

    //Remove the existing rows to make room for new data
    tbody.selectAll('*').remove();

    //to append new rows
    filterData.forEach((sitingReport) => {
        var row = tbody.append("tr");
        Object.entries(sitingReport).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});

