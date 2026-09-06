namespace Auth.Application.DTOs.Auth;

public record UserResponse(
    Guid Id,
    string Email
);