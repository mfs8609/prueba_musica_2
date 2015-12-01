var API_LAST_KEY = "a8da4176b3e227778d267fdc4df7ab36";
var API_LAST_URL = "http://ws.audioscrobbler.com/2.0/?";

function search(){
	var search = $('#search').val();
	$('#search-content').empty();

	$.get(API_LAST_URL, {api_key:API_LAST_KEY, artist:search, format:'json', method:'artist.search', limit:8}, function(data){

		$('#search-content').append('<table id="result-table" class="table table-bordered"></table>');
		$('#result-table').append('<tr><th>Imagen</th><th>Nombre</th><th>Detalle</th></tr>');
		$.each(data.results.artistmatches.artist, function(key, value){

			$('#result-table').append('<tr>'+
										'<td><img src="' + value.image[2]['#text'] + '"></td>'+
										'<td>' + value.name + '</td>'+
										'<td><button class="btn btn-primary" onclick="artistDetail(\''+value.mbid+'\');">Ver</button></td>'+
									  '</tr>');
			
		});

	});
}

function artistDetail(mbid)
{
	$.get(API_LAST_URL, {api_key:API_LAST_KEY, mbid, format:'json', method:'artist.getInfo'}, function(data){
		$('#search-content').empty();
		$('#search-content').append('<img src="'+ data.artist.image[3]['#text'] +'">');
		$('#search-content').append('<hr>');
		$('#search-content').append('<h2>' + data.artist.name + '</h2>');
		$('#search-content').append('<strong>Bio: </strong><br>');
		$('#search-content').append('<p>' + data.artist.bio.content + '</p>');
	});

	$.get(API_LAST_URL, {api_key:API_LAST_KEY, mbid, format:'json', method:'artist.getTopAlbums'}, function(data){

		$('#search-content').append('<h2>Top Albums</h2><br>');
		$('#search-content').append('<table id="result-table" class="table table-bordered"></table>');
		$('#result-table').append('<tr><th>Imagen</th><th>Nombre</th></tr>');
		$.each(data.topalbums.album, function(key, value){

			$('#result-table').append('<tr>'+
										'<td><img src="' + value.image[2]['#text'] + '"></td>'+
										'<td>' + value.name + '</td>'+
									  '</tr>');
			
		});

	});
}