import { PickDto, Rule, RuleType } from '@midwayjs/validate';

export class LoginDTO {
  @Rule(RuleType.string().required())
  email?: string;

  @Rule(RuleType.string().required())
  password?: string;
}

export class RegisterDTO extends LoginDTO {
  token?: string;
}

export class VerifyDTO extends PickDto(LoginDTO, ['email']) {
  @Rule(RuleType.string().required())
  token?: string;
}
