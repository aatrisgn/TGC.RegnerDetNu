using Microsoft.Extensions.DependencyInjection;
using TGC.WebApi.Communication.Mediator;

namespace TGC.Api.Communication;

public static class IServiceCollectionExtensions
{
	public static IServiceCollection RegisterMediator(this IServiceCollection services)
	{
		services.AddScoped<IMediator, Mediator>();
		return services;
	}
}