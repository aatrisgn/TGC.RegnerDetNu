FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

ARG BUILD_CONFIGURATION=Release

WORKDIR /src

COPY ["TGC.RegnerDetNu.Api/TGC.RegnerDetNu.Api.csproj", "TGC.RegnerDetNu.Api/"]
RUN dotnet restore "TGC.RegnerDetNu.Api/TGC.RegnerDetNu.Api.csproj"

COPY . .

#We are passing custom build parameter buildAngularClient in since it doesn't make sense to build in docker
RUN dotnet build "TGC.RegnerDetNu.Api/TGC.RegnerDetNu.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build -p:buildAngularClient=false

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TGC.RegnerDetNu.Api/TGC.RegnerDetNu.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false -p:buildAngularClient=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TGC.RegnerDetNu.Api.dll"]