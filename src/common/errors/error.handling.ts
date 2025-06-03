import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import path from "path";

@Catch()
export class AllExseptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExseptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const responce = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(`Status: ${status} Error: ${exception}`);

    responce.status(status).json({
      statusCode: status,
      message: exception,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
