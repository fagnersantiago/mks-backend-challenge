import { AuthService } from './auth.service';
import { InMemoryUserRepository } from '../infra/database/prisma/repositories/inMemoryRepository/user-InMemory.repository';
import { Rule } from '../entitie/user';
import { InvalidUsernameOrPassword } from '../errors/invalid-user-or-password';
import { SingDTO } from './dto/signDto';

const jwtServiceMock = {
  sign: jest.fn(),
  verify: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userInMemroyRepository: InMemoryUserRepository;

  beforeEach(() => {
    authService = new AuthService(
      userInMemroyRepository,
      jwtServiceMock as any,
    );
    userInMemroyRepository = new InMemoryUserRepository();
  });

  it('should generate an access token for the user', async () => {
    const user: SingDTO = {
      userId: '1',
      userName: 'testuser',
      password: '$2b$10$1234567890',
      rule: Rule.USER,
    };

    const expectedPayload = {
      userId: user.userId,
      username: user.userName,
      role: user.rule,
    };

    jwtServiceMock.sign.mockReturnValue('mocked-access-token');

    const result = await authService.login(user);

    expect(result.data.token).toEqual('mocked-access-token');
    expect(result.data.user).toEqual(expectedPayload);

    expect(jwtServiceMock.sign).toHaveBeenCalledWith(expectedPayload);
  });

  it('should throw InvalidUsernameOrPassword with incorrect password or userName', async () => {
    try {
      const sut = {
        userName: 'JhonDoe',
        password: 'correctPassword',
      };

      const createUser = await userInMemroyRepository.create({
        userName: sut.userName,
        password: sut.password,
      });

      const result = await authService.validateUser(
        createUser.userName,
        createUser.password,
      );

      await authService.validateUser(result.userName, 'incorrectPassword');
      await authService.validateUser('icorrecteUserName', result.userName);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidUsernameOrPassword);
    }
  });
});
