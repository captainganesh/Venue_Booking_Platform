using Auth.Domain.Entities;

namespace Auth.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
}