using Microsoft.AspNetCore.Mvc;
using TGC.Api.Communication;
using TGC.RegnerDetNu.Api.Contracts;
using TGC.RegnerDetNu.Application.Features.Weather.GetCurrentWeather;
using TGC.WebApi.Communication.Mediator;

namespace TGC.RegnerDetNu.Api.Controllers;

public class WeatherController : TgcControllerBase
{
	private readonly IMediator _mediator;

	public WeatherController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	[Route("weather/current/{longitude}/{latitude}")]
	[ProducesResponseType(typeof(CurrentWeatherResponse), StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status404NotFound)]
	public async Task<IActionResult> GetCurrentWeatherByLongAndLat(string longitude, string latitude)
	{
		var currentWeatherQuery = new GetCurrentWeatherQuery(longitude, latitude);

		var result = await _mediator.HandleQueryAsync<GetCurrentWeatherQuery, GetCurrentWeatherQueryResponse>(currentWeatherQuery);

		return result.ToActionResult();
	}
}