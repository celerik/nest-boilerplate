import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

@Catch(QueryFailedError, EntityNotFoundError)
export class QueryError implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response: any = context.getResponse<Response>();
    const { name, detail } = exception;
    let message: string = detail;
    let field: string;
    if (typeof detail === 'string' && detail.includes('already exists')) {
      const dataField = detail.split('=');
      const dataOne = dataField[0].split('(');
      field = dataOne[1].split(')').join('');
      message = detail.replace(
        'Key',
        exception.table.split('_').join(' ') + ' with',
      );
    }
    const errorResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      error: name,
      field,
    };
    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
