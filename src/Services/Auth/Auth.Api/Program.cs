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
// 2. REPOSITORIES
// =====================================================

builder.Services.AddScoped<IUserRepository, UserRepository>();


// =====================================================
// 3. APPLICATION SERVICES
// =====================================================

builder.Services.AddScoped<AuthService>();


// =====================================================
// 4. SECURITY SERVICES
// =====================================================

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddScoped<IJwtService, JwtService>();


// =====================================================
// 5. JWT AUTHENTICATION
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
// 6. AUTHORIZATION
// =====================================================

builder.Services.AddAuthorization();


// =====================================================
// 7. CONTROLLERS / OPENAPI
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
// 8. HTTP PIPELINE
// =====================================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}


// =====================================================
// 8. HTTP PIPELINE
// =====================================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


// Authentication MUST come before Authorization
app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();

app.Run();