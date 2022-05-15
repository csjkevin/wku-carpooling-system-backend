import { Rule, RuleType } from '@midwayjs/validate';

export class OrderDTO {
  id?: number;

  @Rule(RuleType.string())
  fromAddress?: string;

  @Rule(RuleType.string())
  toAddress?: string;

  @Rule(RuleType.date())
  departureTime?: Date;

  @Rule(RuleType.number().min(1))
  capacity?: number;

  @Rule(RuleType.string())
  remark?: string;
}

export class CreateOrderDTO extends OrderDTO {
  @Rule(RuleType.string().required())
  fromAddress?: string;

  @Rule(RuleType.string().required())
  toAddress?: string;

  @Rule(RuleType.date().required())
  departureTime?: Date;

  @Rule(RuleType.number().min(1).required())
  capacity?: number;
}
