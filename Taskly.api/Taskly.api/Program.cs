using Microsoft.EntityFrameworkCore;
using Taskly.api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Used if you want to use an in memory database
//builder.Services.AddDbContext<TasklyDbContext>(options => options.UseInMemoryDatabase("TodoDb"));
builder.Services.AddDbContext<TasklyDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("TasklyConnection")
    ));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
