using Auth.Domain.Entities;
using Auth.Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Auth.Application.Services;

public class AuthService
{
    private readonly IUserRepository _userRepository;

    private readonly IPasswordHasher<User>
        _passwordHasher;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher<User> passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<User?> RegisterAsync(
        string email,
        string password)
    {
        var existing =
            await _userRepository
                .GetByEmailAsync(email);

        if (existing != null)
            return null;

        var user = new User(
            email,
            _passwordHasher.HashPassword(
                null!,
                password
            )
        );

        await _userRepository.AddAsync(user);

        return user;
    }

    public async Task<User?> LoginAsync(
        string email,
        string password)
    {
        var user =
            await _userRepository
                .GetByEmailAsync(email);

        if (user == null)
            return null;

        var result =
            _passwordHasher
                .VerifyHashedPassword(
                    user,
                    user.PasswordHash,
                    password
                );

        if (result ==
            PasswordVerificationResult.Failed)
        {
            return null;
        }

        return user;
    }
}