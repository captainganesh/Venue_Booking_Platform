using Auth.Application.Interfaces;
using Auth.Application.Services;
using Auth.Domain.Entities;
using Auth.Infrastructure.Persistence;
using Auth.Infrastructure.Repositories;
using Auth.Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.Text;

var builder = WebApplication.CreateBuilder(args);


// =====================================================
// 1. DATABASE
// =====================================================

builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("AuthDb")
    )
);


// =====================================================
// 2. CORS
// =====================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


// =====================================================
// 3. REPOSITORIES
// =====================================================

builder.Services.AddScoped<IUserRepository, UserRepository>();


// =====================================================
// 4. APPLICATION SERVICES
// =====================================================

builder.Services.AddScoped<AuthService>();


// =====================================================
// 5. SECURITY SERVICES
// =====================================================

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddScoped<IJwtService, JwtService>();


// =====================================================
// 6. JWT AUTHENTICATION
// =====================================================

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            builder.Configuration["Jwt:Key"]!
                        )
                    )
            };
    });


// =====================================================
// 7. AUTHORIZATION
// =====================================================

builder.Services.AddAuthorization();


// =====================================================
// 8. CONTROLLERS / OPENAPI
// =====================================================

builder.Services.AddControllers();

builder.Services.AddOpenApi();


// =====================================================
// IMPORTANT:
// Build ONLY AFTER registering all services
// =====================================================
var app = builder.Build();


// =====================================================
// APPLY DATABASE MIGRATIONS
// =====================================================

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
    dbContext.Database.Migrate();
}


// =====================================================
// 9. HTTP PIPELINE
// =====================================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("Frontend");

// Authentication MUST come before Authorization
app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();

app.Run();