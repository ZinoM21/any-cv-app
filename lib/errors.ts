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

  constructor(message?: string, status?: number) {
    super(
      message || "You are not authorized. Please log in or create an account."
    );
    this.status = status;
  }
}

export class BadRequestError extends Error {
  constructor() {
    super("Something about your request is not right. Please try again.");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials. Try a different email or password.");
  }
}

export class ServiceUnavailableError extends Error {
  constructor() {
    super("An upstream service is unavailable. Try again later.");
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super("You don't have access. Try another resource or account.");
  }
}

export class RateLimitExceededError extends Error {
  constructor() {
    super(
      "Easy cowboy! Slow down there. You're sending too many requests. Try again later."
    );
  }
}

export class InternalServerError extends Error {
  constructor() {
    super("We encountered an error on our end. Please try again later.");
  }
}

export class ConnectionFailedError extends Error {
  constructor() {
    super("Connection to server failed. Please try again later.");
  }
}

export enum ApiErrorType {
  BadRequest = "bad_request",
  TokenExpired = "token_expired",
  InvalidToken = "invalid_token",
  InvalidCredentials = "invalid_credentials",
  ServiceUnavailable = "service_unavailable",
  RateLimitExceeded = "Rate limit exceeded:",
  InternalServerError = "internal_server_error",

  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  ResourceNotFound = "resource_not_found",
  ResourceAlreadyExists = "resource_already_exists"
}
