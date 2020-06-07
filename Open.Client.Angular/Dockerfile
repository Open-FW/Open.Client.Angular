#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Open.Client.Angular/Open.Client.Angular.csproj", "Open.Client.Angular/"]
RUN dotnet restore "Open.Client.Angular/Open.Client.Angular.csproj"
COPY . .
WORKDIR "/src/Open.Client.Angular"
RUN dotnet build "Open.Client.Angular.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Open.Client.Angular.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Open.Client.Angular.dll"]