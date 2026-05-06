using TGC.Api.Communication;
using TGC.OpenWeatherApi;
using TGC.RegnerDetNu.Application;

namespace TGC.RegnerDetNu.Api;

public static class IServiceCollectionExtensions
{
	public static IServiceCollection ConfigureApi(this IServiceCollection services)
	{
		services.RegisterMediator();
		services.AddOpenWeatherApi(configuration =>
		{
			configuration.UseKeyvault = false;
			configuration.ApiKey = Environment.GetEnvironmentVariable("OPEN_WEATHER_API_KEY") ?? throw new Exception("OPEN_WEATHER_API_KEY not set");
		});
		services.RegisterApplication();
		
		return services;
	}
}