using Auth.Application.DTOs.Auth;
using Auth.Application.Interfaces;
using Auth.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Auth.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IJwtService _jwtService;

    public AuthController(
        AuthService authService,
        IJwtService jwtService)
    {
        _authService = authService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequest request)
    {
        var user =
            await _authService.RegisterAsync(
                request.Email,
                request.Password
            );

        if (user == null)
        {
            return Conflict(
                new
                {
                    message =
                        "A user with this email already exists"
                }
            );
        }

        return Ok(
            new UserResponse(
                user.Id,
                user.Email
            )
        );
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequest request)
    {
        var user =
            await _authService.LoginAsync(
                request.Email,
                request.Password
            );

        if (user == null)
        {
            return Unauthorized(
                new
                {
                    message =
                        "Invalid credentials"
                }
            );
        }

        var token =
            _jwtService.GenerateToken(user);

        return Ok(
            new LoginResponse(
                token,
                new UserResponse(
                    user.Id,
                    user.Email
                )
            )
        );
    }
}