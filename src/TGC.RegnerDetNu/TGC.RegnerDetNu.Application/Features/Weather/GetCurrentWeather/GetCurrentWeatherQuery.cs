using TGC.WebApi.Communication.Mediator;

namespace TGC.RegnerDetNu.Application.Features.Weather.GetCurrentWeather;

public class GetCurrentWeatherQuery : BaseQuery
{
	public string Longitude { get; }
	public string Latitude { get; }
	public GetCurrentWeatherQuery(string longitude, string latitude)
	{
		Latitude = latitude;
		Longitude = longitude;
	}
}