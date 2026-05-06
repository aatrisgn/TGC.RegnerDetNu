using Microsoft.Extensions.DependencyInjection;
using TGC.RegnerDetNu.Application.Features.Weather.GetCurrentWeather;
using TGC.RegnerDetNu.Application.Services;
using TGC.WebApi.Communication.Mediator;

namespace TGC.RegnerDetNu.Application;

public static class IServiceCollectionExtensions
{
	public static IServiceCollection RegisterApplication(this IServiceCollection services)
	{
		services.RegisterServices();
		services.RegisterQueries();
		return services;
	}
	
	private static IServiceCollection RegisterServices(this IServiceCollection services)
	{
		services.AddScoped<IWeatherTranslationService, WeatherTranslationService>();
		return services;
	}

	private static IServiceCollection RegisterQueries(this IServiceCollection services)
	{
		services.AddScoped<IQueryHandler, GetCurrentWeatherQueryHandler>();
		return services;
	}
}