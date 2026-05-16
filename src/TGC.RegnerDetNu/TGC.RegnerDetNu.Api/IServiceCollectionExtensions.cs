using TGC.Api.Communication;
using TGC.OpenWeatherApi;
using TGC.RegnerDetNu.Application;

namespace TGC.RegnerDetNu.Api;

public static class IServiceCollectionExtensions
{
	public static IServiceCollection ConfigureApi(this IServiceCollection services,
		ConfigurationManager builderConfiguration)
	{
		services.RegisterMediator();
		services.AddOpenWeatherApi(configuration =>
		{
			configuration.UseKeyvault = false;
			configuration.ApiKey = builderConfiguration.GetValue<string>("OPEN_WEATHER_API_KEY") ?? string.Empty;
		});
		services.RegisterApplication();
		
		var allowedHosts = builderConfiguration.GetValue<string>("CorsAllowedOrigins");

		services.AddCors(options =>
		{
			options.AddPolicy(name: "CORS_ORIGINS_POLICY",
				builder =>
				{
					builder.WithOrigins(allowedHosts!)
						.AllowAnyMethod()
						.AllowAnyHeader()
						.AllowCredentials();
				});
		});
		
		return services;
	}
}