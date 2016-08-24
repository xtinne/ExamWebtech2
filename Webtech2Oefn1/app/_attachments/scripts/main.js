function createDoc(){
	var gerecht = $("#gerecht").val();
	var hoeveelheid = $("#hoeveelheid").val();
	var tafelNr = $("#tafelNr").val();
	var opmerkingen = $("#opmerkingen").val();
	var opgeleverd = 0;
	var datum = new Date();
	
	var doc = {};
	
	doc.gerecht = gerecht;
	doc.hoeveelheid = hoeveelheid;
	doc.tafelNr = tafelNr;
	doc.opmerkingen = opmerkingen;
	doc.datum = datum;
	doc.opgeleverd = opgeleverd;
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
        	var htmlString = '<table class="table table-hover"><tr><td>Gerecht</td><td>Hoeveelheid</td><td>Tafelnummer</td><td>Opmerkingen</td><td>Datum en uur van bestelling</td><td>Opgeleverd</td></tr>';
        	for(var i=0; i<arr.length; i++){
        		
        		if(arr[i].id.indexOf('_design') == -1){
        			var doc = arr[i].doc;
        			htmlString += '<tr><td>' + doc.gerecht + '</td><td>' + doc.hoeveelheid + '</td><td>' + doc.tafelNr + '</td><td>' + doc.opmerkingen + '</td><td>' + doc.datum + '</td><td>' + '<button type="button" class="btn btn-success" onClick="editDoc(\'' + doc._id + '\',\'' + doc._rev + '\',\'' + doc.gerecht + '\',\'' + doc.hoeveelheid + '\',\'' + doc.tafelNr + '\',\'' + doc.opmerkingen + '\',\'' + doc.datum + '\',\'' + doc.opgeleverd + '\')">Opleveren</button>' + '</td></tr>';
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

function editDoc(id, rev, gerecht, hoeveelheid, tafelNr, opmerkingen, datum, opgeleverd){
	
	$('#output').hide();
	$('#edit').show();
	
	var html = '';

	html += '<h3>Lever op</h3><table class="table table-hover">';
	html += '<input type="hidden" id="_id" value="' + id + '"/>';
	html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
	html += '<input type="hidden" id="gerecht" value ="' + gerecht + '"/>';
	html += '<input type="hidden" id="hoeveelheid" value ="' + hoeveelheid + '"/>';
	html += '<input type="hidden" id="tafelNr" value ="' + tafelNr + '"/>';
	html += '<input type="hidden" id="gerecht" value ="' + opmerkingen + '"/>';
	html += '<input type="hidden" id="datum" value ="' + datum + '"/>';
	html += '<tr><td>Opgeleverd:</td><td><input id="opgeleverd2" type="checkbox" value="' + opgeleverd + '"/></td></tr>';
	html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Ok</button></td></tr>';
	html += '</table>';
	
	$('#edit').html(html);
}


function updateDoc(){
	
	var id = $("#_id").val();
	var rev = $("#_rev").val();
	var gerecht = $("#gerecht").val();
	var hoeveelheid = $("#hoeveelheid").val();
	var tafelNr = $("#tafelNr").val();
	var opmerkingen = $("#opmerkingen").val();
	var datum = $("#datum").val();
	var opgeleverd = $("#opgeleverd2").val();

	var doc = {};

	doc._id = id;
	doc._rev = rev;
	doc.gerecht = gerecht;
	doc.hoeveelheid = hoeveelheid;
	doc.tafelNr = tafelNr;
	doc.opmerkingen = opmerkingen;
	doc.datum = datum;
	doc.opgeleverd = opgeleverd;
	var json = JSON.stringify(doc);

	$.ajax({
		type : 'PUT',
		url : '../../' + id,
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			$('#edit').hide();
			$('#output').show();
			buildOutput();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}