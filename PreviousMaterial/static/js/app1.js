var listingData =
[
{
"zpid":"48749425",
"address": {
	"street":"2114 Bigelow Ave N",
	"zipcode":"98109",
	"city":"Seattle",
	"state":"WA",
	"latitude":"47.637924",
	"longitude":"-122.347929"
},
"price":"123456",
"image" :"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Ranch_style_home_in_Salinas%2C_California.JPG/220px-Ranch_style_home_in_Salinas%2C_California.JPG",
"bedrooms":"4",
"bathrooms":"3.5",
"finishedSqFt":"3434",
"lotSizeSqFt":"7890",
"yearBuilt":"2005",
"numFloors":"2"
},
{
"zpid":"123456789",
"address": {
	"street":"123 Elm Street",
	"zipcode":"92121",
	"city":"San Deigo",
	"state":"CA",
	"latitude":"32.715",
	"longitude":"-117.1625"
},
"price":"2123456",
"image" :"http://images1.zillow.com/is/image/i0/i0/i64/ISz23uj5vihxnn.jpg?op_sharpen=1&qlt=90&size=400,400",
"bedrooms":"5",
"bathrooms":"3",
"finishedSqFt":"2715",
"lotSizeSqFt":"5550",
"yearBuilt":"2010",
"numFloors":"1"
}
];



function addDataToTable(data, table) {
	
	var t = d3.select(table);
		
	for (i = 0; i<data.length; i++) {
		var item = data[i];
		console.log(item);
		
		var	tbody = t.select('tbody');
		var tr = tbody.append('tr');
		var td = tr.append('td').attr('rowspan', '5');
		var img = td.append('img').attr('src', item.image).attr('width', '200');
		td = tr.append('td').attr('class', 'heading').text("Address");
		td = tr.append('td').attr('class', 'data').text(item.address.street);
		td = tr.append('td').attr('class', 'heading').text("Bedrooms");
		td = tr.append('td').attr('class', 'data').text(item.bedrooms);
		td = tr.append('td').attr('rowspan', '5');
		var div = td.append('td').attr('class', 'map');
		var span = div.append('span').text("Map Here.");
		
		tr = tbody.append('tr');
		td = tr.append('td').html("&nbsp;");
		td = tr.append('td').attr('class', 'data').text(item.address.city + ", " + item.address.state + " " + item.address.zipcode);
		td = tr.append('td').attr('class', 'heading').text("Bathrooms");
		td = tr.append('td').attr('class', 'data').text(item.bathrooms);
		
		tr = tbody.append('tr');
		td = tr.append('td').attr('class', 'heading').text("Square Feet");
		td = tr.append('td').attr('class', 'data').text(item.finishedSqFt);
		td = tr.append('td').attr('class', 'heading').text("Year Built");
		td = tr.append('td').attr('class', 'data').text(item.yearBuilt);
		
		tr = tbody.append('tr');
		td = tr.append('td').attr('class', 'heading').text("Lot Sqft");
		td = tr.append('td').attr('class', 'data').text(item.lotSizeSqFt);
		td = tr.append('td').attr('class', 'heading').text("Floors");
		td = tr.append('td').attr('class', 'data').text(item.numFloors);
		
		tr = tbody.append('tr');
		td = tr.append('td').attr('class', 'heading').text("Price");
		td = tr.append('td').attr('class', 'data').text(item.price);
		td = tr.append('td').attr('class', 'heading').html("&nbsp;");
		td = tr.append('td').attr('class', 'data').html("&nbsp;");
	}
}

addDataToTable(listingData, "#listings");