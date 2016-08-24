function createDoc(){
	var gerecht = $("#gerecht").val();
	var hoeveelheid = $("#hoeveelheid").val();
	var tafelNr = $("#tafelNr").val();
	var opmerkingen = $("#opmerkingen").val();
	var datum = new Date();
	
	var doc = {};
	
	doc.gerecht = gerecht;
	doc.hoeveelheid = hoeveelheid;
	doc.tafelNr = tafelNr;
	doc.opmerkingen = opmerkingen;
	doc.datum = datum;
	var json = JSON.stringify(doc);
	console.log(json);
	
	
	$.ajax({
		type:			'PUT',
		url:			'../../' + gerecht + hoeveelheid + tafelNr + datum,
		data:			json,
		contentType: 	'application/json',
		async:			true,
		success:		function(data){
			console.log(data);
			buildOutput();
		},
		error:			function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown); 
		}
	});
}

function buildOutput(){
	
	$.ajax({
		type:			'GET',
		url:			'../../_all_docs?include_docs=true',
        async:  		true,
        success:		function(data){
        	
        	var arr = JSON.parse(data).rows;
        	var htmlString = '<table>';
        	for(var i=0; i<arr.length; i++){
        		
        		if(arr[i].id.indexOf('_design') == -1){
        			var doc = arr[i].doc;
        			htmlString += '<tr><td>' + doc.gerecht + '</td><td>' + doc.hoeveelheid + '</td><td>' + doc.tafelNr + '</td><td>' + doc.opmerkingen + '</td><td>' + doc.datum + '</td></tr>';
        		}
        	}
        	htmlString += '</table>';
        	console.log(htmlString);
        	$('#output').html(htmlString);
        },
		error: 			function(XMLHttpRequest, textStatus, errorThrown){ 
			console.log(errorThrown); 
		}
	});
}