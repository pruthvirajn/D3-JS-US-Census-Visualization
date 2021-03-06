//<!-- Date: 08 Oct 2016 THINK SIMPLE | Authors: Shanglei Zhang, Abhishek, Alita, Pruthviraj Narayanaswamy -->		

var variable1Chosen;
var regionName;
var pieSectionChosen;
var data1 = [];
var data2 = [];
var labels = [];
		
function firstTabFunc(event)
{
	console.log("F(firstTabFunc): ENTER");
	var i, tabcontent, tablinks;
	var varId;
	//show the first tab content and hide the rest
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById("first").style.display = "block";
	event.currentTarget.className += " active";
						
	//Initialize variable1 type list widget
	d3.select('#variable1Type').selectAll('option').data(variable1Type).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })
		
	selection = document.getElementById('variable1Type');
	variableName = selection.options[selection.selectedIndex].value;	
	document.getElementById("chartHeading").innerHTML = variableName;
	//choropleth map
	variable1Chosen = "Total population within the locality";
	showMap("B01003001", getDivision());
	
	d3.select("#variable1Type")
		.on('change', function() {

		clearChartArea();	
		document.getElementById("chartArea").style.display = "none";
		
		//Get the value of variable that has been chosen
		selection = document.getElementById('variable1Type');
		variableName = selection.options[selection.selectedIndex].value;
		console.log("variableName: "+variableName);
		
		document.getElementById("chartHeading").innerHTML = variableName;
		variable1Chosen = variableName;
		
		if(variableName == "Total population within the locality"){
			hideSecVariable();
			showMap("B01003001", getDivision());
		}
		else if(variableName == "Age distribution broken down by sex"){
			updateSecDropDown(sexByAge);	
			hideSecVariable();
			showMap(getVariableId(sexByAge), getDivision());
		}
		else if(variableName == "Median age by sex"){
			updateSecDropDown(medianAgebySex);	
			hideSecVariable();
			showMap(getVariableId(medianAgebySex), getDivision());
		}
		else if(variableName == "Race"){
			updateSecDropDown(race);	
			hideSecVariable();
			showMap(getVariableId(race), getDivision());		
		}
		else if(variableName == "Living arrangement for adults (18 years and over)"){
			updateSecDropDown(livingArrangements);	
			hideSecVariable();
			showMap(getVariableId(livingArrangements), getDivision());			
		}
		else if(variableName == "Place of birth by nativity"){
			updateSecDropDown(placeOfBirth);
			hideSecVariable();
			showMap(getVariableId(placeOfBirth), getDivision());			
		}
		else if(variableName == "Median household income"){
			hideSecVariable();
			showMap("B19013001", getDivision());
		}
		else if(variableName == "Per capita income"){
			hideSecVariable();
			showMap("B19301001", getDivision());
		}
		else if(variableName == "Income to poverty-level ratio"){
			updateSecDropDown(incomeToPovertyRatio);
			hideSecVariable();
			showMap(getVariableId(incomeToPovertyRatio), getDivision());			
		}
		else if(variableName == "Poverty level by place of birth"){
			updateSecDropDown(povertyByPlace);	
			hideSecVariable();
			showMap(getVariableId(povertyByPlace), getDivision());			
		}
		else if(variableName == "Educational attainment by place of birth"){
			updateSecDropDown(educationalAttainment);	
			hideSecVariable();
			showMap(getVariableId(educationalAttainment), getDivision());			
		}
		else if(variableName == "Travel time to work"){
			updateSecDropDown(travelTimeToWork);	
			hideSecVariable();
			showMap(getVariableId(travelTimeToWork), getDivision());			
		}
		else if(variableName == "Means of transportation to work"){
			updateSecDropDown(meansOfTransportation);
			hideSecVariable();
			showMap(getVariableId(meansOfTransportation), getDivision());			
		}
		else{
			//none!
		}
	});
	
	d3.select("#variable2Type")
		.on('change', function() {	
		
		clearChartArea();	
		document.getElementById("chartArea").style.display = "none";
		replotMap();
	});
	
	d3.select("#state")
		.on('change', function() {	
		
		clearChartArea();	
		document.getElementById("chartArea").style.display = "none";
		replotMap();
	});
	
	d3.select("#county")
		.on('change', function() {	
		
		clearChartArea();	
		document.getElementById("chartArea").style.display = "none";
		replotMap();
	});
	
	console.log("F(firstTabFunc): EXIT");
}

//in case of variable 2 reselection and radio button toggle replot the map
function replotMap()
{
		//Get the value of variable that has been chosen
		selection = document.getElementById('variable1Type');
		variableName = selection.options[selection.selectedIndex].value;
		console.log("variableName: "+variableName);
	
		if(variableName == "Total population within the locality"){
			showMap("B01003001", getDivision());
		}
		else if(variableName == "Age distribution broken down by sex"){
			showMap(getVariableId(sexByAge), getDivision());
		}
		else if(variableName == "Median age by sex"){		
			showMap(getVariableId(medianAgebySex), getDivision());
		}
		else if(variableName == "Race"){	
			showMap(getVariableId(race), getDivision());		
		}
		else if(variableName == "Living arrangement for adults (18 years and over)"){
			showMap(getVariableId(livingArrangements), getDivision());			
		}
		else if(variableName == "Place of birth by nativity"){
			showMap(getVariableId(placeOfBirth), getDivision());			
		}
		else if(variableName == "Median household income"){
			showMap("B19013001", getDivision());
		}
		else if(variableName == "Per capita income"){
			showMap("B19301001", getDivision());
		}
		else if(variableName == "Income to poverty-level ratio"){
			showMap(getVariableId(incomeToPovertyRatio), getDivision());			
		}
		else if(variableName == "Poverty level by place of birth"){	
			showMap(getVariableId(povertyByPlace), getDivision());			
		}
		else if(variableName == "Educational attainment by place of birth"){	
			showMap(getVariableId(educationalAttainment), getDivision());			
		}
		else if(variableName == "Travel time to work"){
			showMap(getVariableId(travelTimeToWork), getDivision());			
		}
		else if(variableName == "Means of transportation to work"){
			showMap(getVariableId(meansOfTransportation), getDivision());			
		}
		else{
			//none!
		}
}

//show the second variable label and drop down	
function showSecVariable()
{
	document.getElementById("secVarLabel").style.display = "block";
	document.getElementById("variable2Type").style.display = "block";
}

//hide the second variable label and drop down	
function hideSecVariable()
{
	document.getElementById("secVarLabel").style.display = "none";
	document.getElementById("variable2Type").style.display = "none";
}

//read radio button selection and return result
function getDivision()
{
	var division = document.getElementById('state').checked;
	if(division)
	{
		return "state";
	}
	else
	{
		return "county";
	}
}

//get variable ID mapping to the value of variable 2
function getVariableId(variableMap)
{
    var flag=false;
    var keyVal;
	selection = document.getElementById('variable2Type');
	variableName = selection.options[selection.selectedIndex].value;
	
	for (key in variableMap){
         if (variableMap[key] == variableName){
             flag=true;
             keyVal=key;
             break;
         }
    }
    if(flag){
		console.log("F(getVariableId): variableId= "+keyVal);
        return keyVal;
    }
    else{
        return false;
    }
}

//update the options on the variable 2 drop down
function updateSecDropDown(variable1)
{
	d3.select('#variable2Type').selectAll('option').remove();
	//show the second variable widget
	showSecVariable();
	//Initialize variable2 type list widget
	//get the values from the map
	var vals = Object.keys(variable1).map(function(key) {
		return variable1[key];
	});

	//update the variable2 widget with values
	d3.select('#variable2Type').selectAll('option').data(vals).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })	
}

//function will be called when the mouse enters a particular division on the map
function showDivisonData(divisonId, divisionName, value)
{
	regionName = divisionName;
	console.log("onmouseenter "+divisionName+" "+value);
	document.getElementById("chartArea").style.display = "block";
	
	if(divisionName == "undefined")
	{
		document.getElementById("totalName").innerHTML = "Data not available for the selected region.";
		document.getElementById("totalValue").innerHTML = "";
		document.getElementById("itemName").innerHTML = "";
		document.getElementById("itemValue").innerHTML ="";
		document.getElementById("barChart").style.display = "none";
		clearChartArea();
	}
	else
	{
		document.getElementById("barChart").style.display = "block";
		document.getElementById("totalName").innerHTML = "Region: "+divisionName;
		//document.getElementById("reg").innerHTML = divisionName;
		if(variableName = "Total population within the locality" || "Median age by sex" || "Median household income" || "Per capita income")
		document.getElementById("totalValue").innerHTML = value;
		else 
		document.getElementById("totalValue").innerHTML = "";
		clearChartArea();
		drawDetailCharts(divisonId);
	}
}

//prepare variable ID to passed as param in the http request
function getMeParam(variable)
{
	var reqVar = "";
	
	//create the request variable to be sent in the URL
	for(i = 0; i < variable.length; i++)
	{
		if(i < 6)
		{
			reqVar+= variable[i];
		}
		else if(i == 6)
		{
			reqVar+= "_";
			reqVar+= variable[i];
		}
		else
		{
			reqVar+= variable[i];
		}
	}

	//lastly append character 'E' to variable
	reqVar+= "E";
	
	return reqVar;
}

//Fetches the dataset asynchronously and draws the choropleth
//Input: Census data variable and division - state/county
function showMap(variable, division)
{
	d3.select("#map svg").selectAll("g").remove();
	
	key = "fde7a6799344ca6ac10703be422b56fd1599cac8";
	year = "2015";
	
	var reqVar = getMeParam(variable);
	
	console.log("F(getData) : reqVar = "+reqVar);
	
	//get the response asynchronously
	var q = d3.queue()
		.defer(d3.json, "data/us-10m.json")
	    .defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+division+":*&key="+key)
		.awaitAll(function(error, results) {
			if (error) throw error;
			
			console.log(results[0]);
			
			var val = [];
			var countyId;
			var valById = d3.map();
			var nameById = d3.map();
			var index = 1;
			
			for(i = 1; i < results[index].length; i++)
			{
				//make sure to start from 0 index for val else trouble at min and max and later
				val[i-1] = parseInt(results[index][i][1]);
				//make the key field using "state"+"county" value
				countyId = parseInt(results[index][i][2] + results[index][i][3]);
				//store the values and their IDs
				valById.set(countyId, parseInt(results[index][i][1]));
				//store the names and their IDs
				nameById.set(countyId, results[index][i][0]);
			}

			min = d3.min(val);	
			max = d3.max(val);
		
			console.log("min : "+min);
			console.log("max : "+max);
			
			var quantize = d3.scaleQuantize()
				.domain([min, max])
				.range(["#a6bddb", "#034e7b"]);
					
			var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .offset([-10, 0])
				  .html(function(d) {
					return "<strong>Region:</strong> <span style='color:red'>" + nameById.get(d.id) + "</span>";
				  })
				  
			svg.call(tip);

			if(getDivision() == "state"){
				//modify states to counties to get for counties below
				var paths = svg.append("g")
					.attr("transform", "translate(100, 0)")
					.attr("class", "states")
					.selectAll("path")
					.data(topojson.feature(results[0], results[0].objects.states).features)
					.enter().append("path")
					.attr("onmousedown", function(d){ return "showDivisonData("+d.id+",'"+nameById.get(d.id)+"',"+valById.get(d.id)+")";})
					.attr("id", function(d) { return d.id; })
					.attr("fill", function(d) { return quantize(valById.get(d.id)); })
					.attr("d", path)
					.on("click", clicked)
					.on("mouseover", tip.show)
					.on("mouseout",  tip.hide);
					
					
					var linear = d3.scaleLinear()
								.domain([min, max])
								.range(["#a6bddb", "#034e7b"]);
					  
					svg.append("g")
					  .attr("class", "legendLinear")
					  .attr("transform", "translate(900,360)");
					  
					// Assigning names to states
					/*
					svg.selectAll(".subunit-label")
    				.data(topojson.feature(results[0], results[0].objects.states).features)
  					.enter().append("text")
    				.attr("class", function(d) { return "subunit-label " + d.id; })
    				.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    				.attr("dy", ".35em")
    				.text(function(d) { return nameById.get(d.id); });  
					*/
					
					var legendLinear = d3.legendColor()
					  .shapeWidth(80)
					  .cells(5)
					  .orient('vertical')
					  .scale(linear);

					svg.select(".legendLinear")
					  .call(legendLinear);

			}
			else{
				//modify states to counties to get for counties below
				var paths = svg.append("g")
					.attr("transform", "translate(100, 0)")
					.attr("class", "counties")
					.selectAll("path")
					.data(topojson.feature(results[0], results[0].objects.counties).features)
					.enter().append("path")
					.attr("onmousedown", function(d){ return "showDivisonData("+d.id+",'"+nameById.get(d.id)+"',"+valById.get(d.id)+")";})
					.attr("id", function(d) { return d.id; })
					.attr("fill", function(d) { if(valById.get(d.id)){ return quantize(valById.get(d.id)); }else{ return "#cccccc";}})
					.attr("d", path)
					.on("click", clicked)
					.on("mouseover", tip.show)
					.on("mouseout",  tip.hide);
					
					var linear = d3.scaleLinear()
								.domain([min, max])
								.range(["#a6bddb", "#034e7b"]);
					  
					svg.append("g")
					  .attr("class", "legendLinear")
					  .attr("transform", "translate(900,360)");

					var legendLinear = d3.legendColor()
					  .shapeWidth(80)
					  .cells(5)
					  .orient('vertical')
					  .scale(linear);

					svg.select(".legendLinear")
					  .call(legendLinear);
			}
			
			function clicked(d) 
			{
				if (active.node() === this) return reset();
				active.classed("active", false);

				active = d3.select(this).classed("active", true);

				var bounds = path.bounds(d),
				dx = bounds[1][0] - bounds[0][0],
				dy = bounds[1][1] - bounds[0][1],

				x = (bounds[0][0] + bounds[1][0]) / 2,
				y = (bounds[0][1] + bounds[1][1]) / 2,

				scale = .9 / Math.max(dx / width, dy / height),
				translate = [width / 2 - scale * x, height / 2 - scale * y];

				paths.transition()
				.duration(750)
				.style("stroke-width", 1.5 / scale + "px")
				.attr("transform", "translate(" + translate + ")scale(" + scale + ")");
			}

			function reset() 
			{
				active.classed("active", false);
				active = d3.select(null);
				paths.transition()
					.duration(750)
					.style("stroke-width", "1.5px")
					.attr("transform", "");
			}
	});
}

//draw the detail charts for the selected division on the map
function drawDetailCharts(chosenDivisonId)
{
	console.log("divison ID: "+chosenDivisonId);
	document.getElementById("totalValue").style.display = "block";
	document.getElementById("barChart").style.display = "none";
	
	if(variable1Chosen == "Total population within the locality")
	{
		var regionData = d3.map();
		var index = 0;
		var total = 0;
		var q = d3.queue();
		var reqVar = getMeParam("B01003001");
		q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		var data = [];
		console.log("drawing chart");
		document.getElementById("totalValue").style.display = "block";
		
		q.awaitAll(function(error, results) {
			if (error) throw error;	
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						total +=  parseInt(results[index][i][1]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(results[index][i][0], results[index][i][1]);							
						}	
					}				
				}	
				
				var str = Object.keys(regionData);
				data = [	{label:"Total", value: total},
							{label:regionName, value: Object.values(regionData)} 	];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
					//showTinyBarChart(values, "sexByAge");
				}
		});	
	}
	
	if(variable1Chosen == "Age distribution broken down by sex")
	{
		var varIDs = Object.keys(sexByAge);
		var items = Object.values(sexByAge);
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		var index1 = 0;
		var index2 = 0;
		var index3 = 0;
		
		document.getElementById("totalValue").style.display = "none";
		document.getElementById("barChart").style.display = "block";
		
		for(m = 0; m < Object.keys(sexByAge).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
			
				console.log("results lenght: "+results.length);
				console.log("results 0 index lenght: "+results[index].length);
				//loop for all variables in the sexByAge array - loop runs for 49 variables
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1; loop runs through states
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							//store values by age range male and female separately
							if(index >= 2 && index <= 24)
							{
								data1[index1++] = parseInt(results[index][i][1]);
								labels[index3++] = items[index];
							}
							if(index >= 26 && index <= 48)
							{
								data2[index2++] = parseInt(results[index][i][1]);
							}
						}	
					}				
				}	
				data = [	{label:"Male", value: regionData.get("B01001002")},
							{label:"Female", value: regionData.get("B01001026")} 	];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
					showTinyBarChart(labels,data1);
				}
		});	
		
		//DO IT ALL INSIDE AWAIT!!!!!!!!!!!!! NO DATA AVAILABLE AFTER THIS!!!!!!!!!!!!
	}

	/* Code addded -Alita : for Race */
	if(variable1Chosen == "Race")
	{
		var varIDs = Object.keys(race);
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		document.getElementById("totalValue").style.display = "none";
		
		for(m = 0; m < Object.keys(race).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
				//loop for all variables in the race array
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							
						}	
					}				
				}	

				data = [	{label:"White", value: regionData.get("B02001002")},
							{label:"Black", value: regionData.get("B02001003")},
							{label:"Native", value: regionData.get("B02001004")},
							{label:"Asian", value: regionData.get("B02001005")},
							{label:"Islander", value: regionData.get("B02001006")},
							{label:"Other", value: regionData.get("B02001007")},
							{label:"Two+", value: regionData.get("B02001008")}	];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
				}
		});	
		
	}
	/*End code - Alita. Race */

		/* Code addded -Alita: Educational attainment by place of birth */
	if(variable1Chosen == "Educational attainment by place of birth")
	{
		var varIDs = Object.keys(educationalAttainment);
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		document.getElementById("totalValue").style.display = "none";
		
		for(m = 0; m < Object.keys(educationalAttainment).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
				//loop for all variables in the educationalAttainment array
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							
						}	
					}				
				}	

				data = [	{label:"No Degree", value: regionData.get("B06009003")},
							{label:"High School", value: regionData.get("B06009003")},
							{label:"Some College", value: regionData.get("B06009004")},
							{label:"Bachelor's", value: regionData.get("B06009005")},
							{label:"Post Grad", value: regionData.get("B06009006")}	];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
				}
		});	
		
	}

	/* Code addded -Alita :Living arrangements */
	if(variable1Chosen == "Living arrangement for adults (18 and over)")
	{
		var varIDs = Object.keys(livingArrangements);
		
		console.log("test");
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		document.getElementById("totalValue").style.display = "none";
		
		for(m = 0; m < Object.keys(livingArrangements).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
				//loop for all variables in the livingArrangements array
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							
						}	
					}				
				}	

				data = [	{label:"Lives Alone", value: regionData.get("B09021002")},
							{label:"Living with spouse", value: regionData.get("B09021003")},
							{label:"Living with partner", value: regionData.get("B09021004")},
							{label:"Living with Child", value: regionData.get("B09021005")},
							{label:"Living with Relatives", value: regionData.get("B09021006")},
							{label:"Others", value: regionData.get("B09021007")}];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
				}

				});
			}
				/*End code: Alita*/

		if(variable1Chosen == "Means of transportation to work")
		{
		var varIDs = Object.keys(meansOfTransportation);
		var items = Object.values(meansOfTransportation);
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		var index1 = 0;
		var index2 = 0;
		var index3 = 0;
		console.log("test1");
		
		document.getElementById("totalValue").style.display = "none";
		document.getElementById("barChart").style.display = "block";
		
		for(m = 0; m < Object.keys(meansOfTransportation).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
			
				console.log("results lenght: "+results.length);
				console.log("results 0 index lenght: "+results[index].length);
				//loop for all variables in the meansOfTransportation array - loop runs for 49 variables
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1; loop runs through states
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							//store values by age range male and female separately
							if(index >= 4 && index <= 8 )
							{
								
								data1[index1++] = parseInt(results[index][i][1]);
								labels[index3++] = items[index];
							}
				
						}	
					}				
				}	
				data = [	{label:"Private Vehicle", value: regionData.get("B08301002")},
							{label:"Public Transport", value: regionData.get("B08301010")},
							{label:"Bicycle", value: regionData.get("B08301018")},
							{label:"Walked", value: regionData.get("B08301019")},
							{label:"Other Means", value: regionData.get("B08301020")} 	];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
					showTinyBarChart(labels,data1);
				}
		});	
		
		//DO IT ALL INSIDE AWAIT!!!!!!!!!!!!! NO DATA AVAILABLE AFTER THIS!!!!!!!!!!!!
	}
	//Abhishek
	if (variable1Chosen == "Place of birth by nativity")
		{
		var varIDs = Object.keys(placeOfBirth);
		var items = Object.values(placeOfBirth);
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		var index1 = 0;
		var index2 = 0;
		var index3 = 0;
		console.log("test1");
		
		document.getElementById("totalValue").style.display = "none";
		document.getElementById("barChart").style.display = "block";
		
		for(m = 0; m < Object.keys(placeOfBirth).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
			
				console.log("results lenght: "+results.length);
				console.log("results 0 index lenght: "+results[index].length);
				//loop for all variables in the meansOfTransportation array - loop runs for 49 variables
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1; loop runs through states
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							//store values by age range male and female separately
							if(index >= 0 && index <= 7)
							{
								
								data1[index1++] = parseInt(results[index][i][1]);
								labels[index3++] = items[index];
								console.log("test"+labels);
							}
						}	
					}				
				}	
				data = [	{label:"Native", value: regionData.get("C05002002")},
							{label:"Foreign Born", value: regionData.get("C05002008")}
							];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					//var values = Object.values(regionData);
					//showTinyStackedBarChart(labels,data1);
				}
				
				data2 = [	{label:"Native: Born in State of Residence", value: regionData.get("C05002003")},
							{label:"Native: Born in Other State in the United States", value: regionData.get("C05002004")},
							{label:"Native: Born Outside the United States", value: regionData.get("C05002005")},
							{label:"Native: Born in Puerto Rico", value: regionData.get("C05002006")},
							{label:"Native: U.s. Island Areas ", value: regionData.get("C05002007")}
							];

				if(!isNaN(data2[0].value))
				{
					showTinyPie(data2);
					//var values = Object.values(regionData);
					//showTinyStackedBarChart(labels,data2);
				}
		});	
		
		//DO IT ALL INSIDE AWAIT!!!!!!!!!!!!! NO DATA AVAILABLE AFTER THIS!!!!!!!!!!!!
	}
	
	if(variable1Chosen == "Income-poverty-level ratio")
		{
		var varIDs = Object.keys(incomeToPovertyRatio);
		var items = Object.values(incomeToPovertyRatio);
		var regionData = d3.map();
		var index = 0;
		var q = d3.queue();
		var data = [];
		
		var index1 = 0;
		var index2 = 0;
		var index3 = 0;
		console.log("test1");
		
		document.getElementById("totalValue").style.display = "none";
		document.getElementById("barChart").style.display = "block";
		
		for(m = 0; m < Object.keys(incomeToPovertyRatio).length; m++)
		{		
			var reqVar = getMeParam(varIDs[m]);
			q = q.defer(d3.json, "https://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+getDivision()+":*&key="+key);
		}
			
		q.awaitAll(function(error, results) {
			if (error) throw error;	
			
				console.log("results lenght: "+results.length);
				console.log("results 0 index lenght: "+results[index].length);
				//loop for all variables in the meansOfTransportation array - loop runs for 49 variables
				for(index = 0; index < results.length; index++)
				{
					//loop for all the regions except the header - i = 1; loop runs through states
					for(i = 1; i < results[index].length; i++)
					{
						regionId = parseInt(results[index][i][2] + results[index][i][3]);
						//get data for the clicked region only
						if(chosenDivisonId == regionId)
						{
							//store in a map - variable ID, value
							regionData.set(varIDs[index], results[index][i][1]);
							//store values by age range male and female separately
							if(index >= 1 && index <= 13)
							{
								
								data1[index1++] = parseInt(results[index][i][1]);
								labels[index3++] = items[index];
							}
						}	
					}				
				}	
				data = [	{label:"Under .50", value: regionData.get("B17002002")},
							{label:".50 to .74", value: regionData.get("B17002003")},
							{label:".75 to .99", value: regionData.get("B17002004")},
							{label:"1.00 to 1.24", value: regionData.get("B17002005")},
							{label:"1.25 to 1.49", value: regionData.get("B17002006")},
							{label:"1.50 to 1.74", value: regionData.get("B17002007")},
							{label:"1.75 to 1.84", value: regionData.get("B17002008")},
							{label:"1.85 to 1.99", value: regionData.get("B17002009")},
							{label:"2.00 to 2.99", value: regionData.get("B17002010")},
							{label:"3.00 to 3.99", value: regionData.get("B17002011")},
							{label:"4.00 to 4.99", value: regionData.get("B17002012")},
							{label:"5.00 and over", value: regionData.get("B17002013")} 	];

				if(!isNaN(data[0].value))
				{
					showTinyPie(data);
					var values = Object.values(regionData);
					showTinyBarChart(labels,data1);
				}
		});	
		
		//DO IT ALL INSIDE AWAIT!!!!!!!!!!!!! NO DATA AVAILABLE AFTER THIS!!!!!!!!!!!!
	}
}

function clearChartArea()
{
	d3.select("#tinyPie").selectAll("svg").remove();
	d3.select('#pieLegend').selectAll("svg").remove();
	d3.select('#barChart').selectAll("svg").remove();
}

function showPieData(total, data, label)
{
	console.log(total, data);
	var percent = (data / total) * 100;
	document.getElementById("itemValue").innerHTML = percent.toFixed(2)+"%";
	
	if(label == "Male")
	{
		d3.select('#barChart').selectAll("svg").remove();
		document.getElementById("itemName").innerHTML = "MALE";
		showTinyBarChart(labels,data1);
	}
	else if(label == "Female")
	{
		d3.select('#barChart').selectAll("svg").remove();
		document.getElementById("itemName").innerHTML = "FEMALE"
		showTinyBarChart(labels,data2);
	}
	else
	{
		document.getElementById("itemName").innerHTML = label;
	}
}

//show the small pie chart on the detail area next to map
function showTinyPie(dataset)
{
	var width = 200;
	var height = 200;
	var radius = Math.min(width, height) / 2;
	var labels = [];
	var sum = 0;
	
	document.getElementById("itemName").innerHTML = "";
	document.getElementById("itemValue").innerHTML ="";
	
	for(i = 0; i < dataset.length; i++)
	{
		labels[i] = dataset[i].label;
		sum += parseInt(dataset[i].value);
	}
	
	var color = d3.scaleOrdinal()
		.domain(labels)
		.range(['#3D5A80','#98C1D9','#E0FBFC','#EE6C4D','#293241']);

	var svg = d3.select('#tinyPie')
	  .append('svg')
	  .attr('width', width)
	  .attr('height', height)
	  .append('g')
	  .attr('transform', 'translate(' + (width / 2) +  ',' + (height / 2) + ')');

    var arc = d3.arc()
	  .innerRadius(radius-60)
	  .outerRadius(radius);

	var pie = d3.pie()
	  .value(function(d) { return d.value; })
	  .sort(null);

	var path = svg.selectAll('path')
		  .data(pie(dataset))
		  .enter()
		  .append('path')
		  .attr('d', arc)                        
		  .attr('fill', function(d, i) {
			return color(d.data.label);
			})
			.attr("onmousedown", function(d){ return "showPieData("+sum+","+d.value+",'"+d.data.label+"')";})
			.on("mouseover", function() {
			  d3.select(this)
				.attr('fill', '#e1e1e1') 
				.classed("active", true ) 
				
			})
			.on("mouseout",  function() {
			  d3.select(this)
				.classed("active", false)
				.attr('fill', function(d) { return color(d.data.label); })
			});
		
	path.transition()
				.duration(1000)
				.attrTween('d', function(d) {
					var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
					return function(t) {
						return arc(interpolate(t));
					};
				});	
	var piesvg = d3.select('#pieLegend')
	  .append('svg')
	  .attr('width', width/2)
	  .attr('height', height); //fix pie code Abhishek
	  
	piesvg.append("g")
	  .attr("class", "legendQuant")
	  .attr('transform', "translate(10, 10)");
	  
	  
	var legend = d3.legendColor()
	  .shape("path", d3.symbol().type(d3.symbolTriangle).size(100)())
	  .shapePadding(5)
	  .scale(color);

	piesvg.select(".legendQuant")
	  .call(legend);
}
function showTinyBarChart(labels, data)
{
	console.log("O: showTinyBarChart() ENTER --");
	var chartWidth = 800;
	var chartHeight= 130;
	
	// figure out maximum energy production
	var max = d3.max(data);
	var min = d3.min(data);
	
	// figure out the width of individual bars
	var barWidth = chartWidth / labels.length;

	// create a y scale - since the range has arguments interchanged, it returns -scale
	var yScale = d3.scaleLinear()
		.domain([0, max])
		.range([chartHeight , 0]);
		
	var xScale = d3.scaleBand()
		.domain(labels)
		.rangeRound([0 , chartWidth]);
	
	var svg = d3.select('#barChart')
	  .append('svg')
	  .attr('width', chartWidth + 200)
	  .attr('height', chartHeight + 50);
	  
	var group = svg.append("g")
		.attr("transform", "translate(80, 0)");

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
		return "<strong>Value:</strong> <span style='color:yellow'>" + d + "</span>";
	})
	  
	group.call(tip);
	
	//the rectangle will be drawn from upper-left corner - co-ordinate system starts at the upper-left	screen
	
	group.selectAll("rect").data(data).enter().append('rect')
		.attr("class", "bar")
		.attr("x", function(d, i) { return i*barWidth })
		.attr("y", function(d, i) { 
			return yScale(d);
		})
		.attr("width", barWidth)
		.attr("height", function(d) { 
			return chartHeight - yScale(d); 
		})
		.style("stroke", "white")
		.style("fill", "#af8dc3")
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide);

	var xAxis = d3.axisBottom()
		.scale(xScale);

	group.append("g")
		.attr('class', 'axis')
		.attr('transform', 'translate(0,' + chartHeight + ')')
		.call(xAxis);
		
	//uncomment below to get y axis	
	// create y axis
	var yAxis = d3.axisLeft()
		.scale(yScale);

	group.append("g")
		.attr('class', 'axis')
		.attr('transform', 'translate(-2,0)')
		.call(yAxis);
		
	var label1;
	var label2;
	
	if(variable1Chosen = "Age distribution broken down by sex")
	{
		label1 = "Population count";
		label2 = "Ages in years";
	}
	if(variable1Chosen == "Income-poverty-level ratio")
	{
		label1 = "Population count";
		label2 = "Poverty ratio";	
	}
	
	group.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.style("stroke", "grey")
		.style("font-size", 13)
		.attr("transform", "translate("+ (-60) +","+(chartHeight/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text(label1);

	group.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate("+ (chartWidth/2) +","+(chartHeight + 40)+")")  // centre below axis
		.style("stroke", "grey")
		.style("font-size", 13)
		.text(label2);	
	
	console.log("O: showTinyBarChart() EXIT --");
}


function sixthTabFunc(event)
{


	console.log("F(sixthTabFunc): ENTER");
	var i, tabcontent, tablinks;
	var varId;
	//show the first tab content and hide the rest
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById("sixth").style.display = "block";
	event.currentTarget.className += " active";
}
