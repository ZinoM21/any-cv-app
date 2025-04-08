import { CredentialsSignin } from "next-auth";

import { AuthError } from "next-auth";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class AuthorizationError extends AuthError {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export class InvalidCredentialsError extends CredentialsSignin {
  constructor() {
    super("Invalid credentials");
  }
}
