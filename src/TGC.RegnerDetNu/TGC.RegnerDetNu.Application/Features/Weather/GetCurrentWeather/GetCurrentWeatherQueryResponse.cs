using TGC.WebApi.Communication.Mediator;

namespace TGC.RegnerDetNu.Application.Features.Weather.GetCurrentWeather;

public class GetCurrentWeatherQueryResponse : BaseResponse
{
	public bool DoesItRain { get; set; }
	public string WeatherDescription { get; set; }
}