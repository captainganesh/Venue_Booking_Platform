namespace Auth.Application.DTOs.Auth;

public record LoginResponse(
    string AccessToken,
    UserResponse User
);