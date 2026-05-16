using TGC.RegnerDetNu.Api;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
	builder.Configuration.AddUserSecrets<Program>();
}

builder.Services.AddOpenApi();
builder.Services.ConfigureApi(builder.Configuration);
builder.Services.AddProblemDetails();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("CORS_ORIGINS_POLICY");

if (app.Environment.IsDevelopment())
{
	app.UseSwaggerUI(options =>
	{
		options.SwaggerEndpoint("/openapi/v1.json", "v1");
	});
}

app.UseHttpsRedirection();

app.MapControllers();

app.MapOpenApi();

app.Run();