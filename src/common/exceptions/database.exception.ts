import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  private code;
  constructor(message: string, code?: string) {
    super(message, HttpStatus.BAD_REQUEST);
    this.code = code;
  }
  getCode(): string {
    return this.code;
  }
  getMessage(): string {
    return this.message;
  }
}
