let access_token = 'BQBZJHc05WnsXLtzZoZK10ZmeoeTZakJk1GTbABG4rxBlCRbwGe8qp0x2wH3BYdW7NDF0FAhEcOWW77RH5qptEoFMQcOb2X1GKOb7pvnLMXCiCksnawA_ZwYdqG9BnMmyRDAJuyJU4c9AkcHksDfAvGRk1H4MQLpD3J9LF9x43A7f8jQ_j9N9BMlX8hg';
let dev_id = null;

window.onSpotifyWebPlaybackSDKReady = () =>
{
	const token = access_token;
	const player = new Spotify.Player({
		name: 'Player Mood Booster',
		getOAuthToken: cb =>
		{
			cb(token);
		},
		volume: 1
	});
	
	// Error handling
	player.addListener('initialization_error', ({message}) =>
	{
		console.error(message);
	});
	player.addListener('authentication_error', ({message}) =>
	{
		console.error(message);
	});
	player.addListener('account_error', ({message}) =>
	{
		console.error(message);
	});
	player.addListener('playback_error', ({message}) =>
	{
		console.error(message);
	});
	
	// Playback status updates
	player.addListener('player_state_changed', state =>
	{
		console.log(state);
	});
	
	// Ready
	player.addListener('ready', ({device_id}) =>
	{
		console.log('Ready with Device ID', device_id);
		dev_id = device_id;
		$(".mask-block").addClass('d-none');
	});
	
	// Not Ready
	player.addListener('not_ready', ({device_id}) =>
	{
		console.log('Device ID has gone offline', device_id);
		dev_id = device_id;
		$(".mask-block").addClass('d-none');
	});
	
	// Connect to the player!
	player.connect();
};

$(document).ready(function()
{
	$('.mdb-select').material_select();
	
	var humor = $("[data-name='humor']");
	var level = humor.attr('data-value') * humor.width();
	$('.marker').css('left', level + 'px');
});


$(document).on('click', "[data-name]", function(e)
{
	e.preventDefault();
	var name = $(this).attr('data-name');
	var value = $(this).attr('data-value');
	var started = $('#data').hasClass('started');
	
	$('#data').attr('data-' + name, value);
	
	var data = {
		'style': $('#data').attr('data-style'),
		'skip': $('#data').attr('data-skip'),
		'activity': $('#data').attr('data-activity')
	};
	
	$('#data').attr('data-skip', false);
	
	if(name === 'start_stop')
	{
		$("#icon-action").toggleClass('fa-play fa-stop animated infinite pulse');
		if(started)
		{
			pauseMusic();
			$('#data').removeClass('started');
		}
		else
		{
			
			playMusic(data);
			$('#data').addClass('started');
		}
	}
	
	if(name === 'skip')
	{
		if(started)
		{
			playMusic(data);
		}
	}
	
	if(name === 'activity')
	{
		if(started)
		{
			$("#icon-action").trigger('click');
		}
		$("[data-name='activity']").each(function(key, opt)
		{
			if($(opt).attr('data-value') === value)
			{
				$(opt).toggleClass('selected animated infinite tada');
				if(!$(opt).hasClass('selected'))
				{
					$('#data').attr('data-activity', 'aleatorio');
				}
			}
			else
			{
				$(opt).removeClass('selected animated infinite tada');
			}
		});
		
	}
	
});


$(document).on('change', "[data-name='style']", function(e)
{
	e.preventDefault();
	var name = 'style';
	var value = $(this).val();
	
	$('#data').attr('data-' + name, value);
	
});

function playMusic(data)
{
	//Busca o id da musica na API local
	var values = 'style=' + data.style + '&activity=' + data.activity + '&skip=' + data.skip;
	$.ajax({
		dataType: 'json',
		type: 'GET',
		url: '/musics',
		data: values,
		success: function(response)
		{
			var url = 'https://api.spotify.com/v1/me/player/play?device_id=' + dev_id;
			fetch(url, {
				method: 'PUT',
				headers: {
					'authorization': 'Bearer ' + access_token,
				},
				body: JSON.stringify(response)
			}).then(function(response)
			{
				if(!response.context)
				{
					$("#next").trigger('click');
				}
				console.log(response);
			});
		},
		error: function(response)
		{
			console.log(response);
			console.log('Erro ao recuperar a música da API Local.');
		}
	});
}

function pauseMusic()
{
	console.log('Para a música');
	var url = 'https://api.spotify.com/v1/me/player/pause?device_id=' + dev_id;
	
	fetch(url, {
		method: 'PUT',
		headers: {
			'authorization': 'Bearer ' + access_token,
		},
	}).then(function(response)
	{
		// console.log(response);
	});
}