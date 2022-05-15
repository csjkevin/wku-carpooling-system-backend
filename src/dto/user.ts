import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  id?: number;

  @Rule(RuleType.string())
  email?: string;

  @Rule(RuleType.string())
  password?: string;

  @Rule(RuleType.string())
  nickname?: string;
}

export class CreateUserDTO extends UserDTO {
  @Rule(RuleType.string().required())
  email?: string;

  @Rule(RuleType.string().required())
  password?: string;
}
