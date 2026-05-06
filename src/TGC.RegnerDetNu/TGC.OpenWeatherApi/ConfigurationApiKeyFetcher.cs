namespace TGC.OpenWeatherApi;

public class ConfigurationApiKeyFetcher : IWeatherApiKeyResolver
{
	private readonly IOpenWeatherApiConfiguration _configuration;
	
	public ConfigurationApiKeyFetcher(IOpenWeatherApiConfiguration configuration)
	{
		_configuration = configuration;
	}
	public string GetApiKey()
	{
		return _configuration.ApiKey;
	}
}