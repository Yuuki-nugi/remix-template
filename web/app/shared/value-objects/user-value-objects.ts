import { EmailValidator } from "../utils/validators/email-validator";
import { Id } from "./id";

export class UserId extends Id {
  constructor(value: number) {
    super(value);
  }
}

export class UserName {
  constructor(private readonly value: string) {
    if (value.length > 24) {
      throw new Error("ユーザー名は100文字以内で入力してください。");
    }

    if (value.length === 0) {
      throw new Error("ユーザー名は空文字列では入力できません。");
    }
  }

  getValue(): string {
    return this.value;
  }
}

export class UserEmail {
  constructor(private readonly value: string) {
    if (!EmailValidator.isValidEmail(value)) {
      throw new Error("有効なメールアドレスを入力してください。");
    }
  }
}
