$(document).ready(function(){
  
  $.ajax({
		type: 'POST',
		url: 'php/cargar_grupo.php'
	  })
	  .done(function(listas_rep){
		$('#grupo').html(listas_rep)
	  })
	  .fail(function(){
		alert('Hubo un error al cargar los grupos')
  })
  
  $('#grupo').on('change', function(){
	  
	$('#vacunatorios').hide();
	$('#zona').children('option').remove();
	$('#zona').attr("disabled", 'disabled');

	if(($('#grupo').val()!=='') && ($('#grupo').val()!=='0')) {

	  $('#prov').removeAttr("disabled");

	  $.ajax({
		type: 'POST',
		url: 'php/cargar_prov.php'
	  })
	  .done(function(listas_rep){
		$('#prov').html(listas_rep)
	  })
	  .fail(function(){
		alert('Hubo un error al cargar las provincias')
	  })

	} else {
		$('#prov').children('option').remove();
		$('#prov').attr("disabled", 'disabled');
	}

  });

  $('#prov').on('change', function(){
	  
	$('#vacunatorios').hide();
	 
    var prov = $('#prov').val();
	
	 if(prov!=='') {
		 
		switch (prov){
			case '2':
			case '34':
			case '38':
			case '46':
			case '86':
			case '94':
				$('#zona').children('option').remove();
				$('#zona').attr("disabled", 'disabled');
				
				var grupo = $('#grupo').val();
				var prov = $('#prov').val();
				if (prov=='2') {
					var zona = 'caba';
				} else {
					var zona = 0;
				}
				
				$.ajax({
				  type: 'POST',
				  url: 'php/cargar_vacunatorio.php',
				  data: {'grupo':grupo,'prov':prov,'zona':zona}
				})
				.done(function(listas_rep){
				  $('#vacunatorios').show();
				  $('#vacunatorios').html(listas_rep);
				})
				.fail(function(){
				  alert('Hubo un error al cargar el listado');
				})
				break;
			
			default:
				$('#zona').removeAttr("disabled");
			
				$.ajax({
				  type: 'POST',
				  url: 'php/cargar_zona.php',
				  data: {'prov': prov}
				})
				.done(function(listas_rep){
				  $('#zona').html(listas_rep)
				})
				.fail(function(){
				  alert('Hubo un error al cargar las localidades')
				})		
		}
		
	  } else {
		  $('#zona').disabled = true;
	  }
  })
    
  $('#zona').on('change', function(){
	var grupo = $('#grupo').val();
    var zona = $('#zona').val();
    var prov = $('#prov').val();
    $.ajax({
      type: 'POST',
      url: 'php/cargar_vacunatorio.php',
      data: {'grupo':grupo,'zona':zona,'prov':prov}
    })
    .done(function(listas_rep){
	  $('#vacunatorios').show();
      $('#vacunatorios').html(listas_rep);
    })
    .fail(function(){
      alert('Hubo un error al cargar el listado');
    })
  })     

})