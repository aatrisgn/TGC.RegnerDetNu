using System.Net;
using TGC.OpenWeatherApi;
using TGC.RegnerDetNu.Application.Services;
using TGC.WebApi.Communication.Mediator;

namespace TGC.RegnerDetNu.Application.Features.Weather.GetCurrentWeather;

public class GetCurrentWeatherQueryHandler : BaseQueryHandler<GetCurrentWeatherQuery>, IQueryHandler
{
	private readonly IOpenWeatherApiClient _openWeatherApiClient;
	private readonly IWeatherTranslationService _weatherTranslationService;

	public GetCurrentWeatherQueryHandler(IOpenWeatherApiClient openWeatherApiClient, IWeatherTranslationService weatherTranslationService)
	{
		_openWeatherApiClient = openWeatherApiClient;
		_weatherTranslationService = weatherTranslationService;
	}
	
	public async Task<IResult<IQueryResponse>> Handle<TQuery>(TQuery query) where TQuery : IQuery
	{
		var typedQuery = GetTypedQuery(query);
		
		var result = await _openWeatherApiClient.GetCurrentWeatherAsync(typedQuery.Latitude, typedQuery.Longitude);

		if(result.statusCode == HttpStatusCode.NotFound)
		{
			return Result<GetCurrentWeatherQueryResponse>.AsNotFound(
				$"No valid weather data found for (lat, long) {typedQuery.Latitude}, {typedQuery.Longitude}.");
		}

		var weatherResponse = result.Result();

		var weatherDescription = _weatherTranslationService.Translate(weatherResponse.Weather[0].Id);
		var response = new GetCurrentWeatherQueryResponse
		{
			DoesItRain = weatherDescription.Contains("regn"),
			WeatherDescription = weatherDescription,
			Area = weatherResponse.Name
		};
			
		return Result<GetCurrentWeatherQueryResponse>.AsOk(response);
	}
}