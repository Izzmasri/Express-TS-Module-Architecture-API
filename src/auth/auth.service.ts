import { signJwt } from "../shared/utils/jwt.util";
import { UserService } from "../users/users.service";
import { createArgonHash, verifyArgonHash } from "./util/argon.util";
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "./util/auth.dto";

export class AuthService {
  private userService = new UserService();

  public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    const hashedValue = await createArgonHash(payload.password);

    const userData = this.userService.createUser(
      payload.name,
      payload.email,
      hashedValue
    );

    const { password, ...safeData } = userData;
    return safeData;
  }

  public async login(
    payload: LoginDTO
  ): Promise<{ token: string; user: LoginResponseDTO }> {
    const user = this.userService
      .getUsers()
      .find((u) => u.email.toLowerCase() === payload.email.toLowerCase());
    if (!user) throw new Error("Invalid credentials");

    const valid = await verifyArgonHash(payload.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = signJwt({ id: user.id, role: user.role, email: user.email });
    const { password, ...safeUser } = user;
    return { token, user: safeUser };
  }
}
