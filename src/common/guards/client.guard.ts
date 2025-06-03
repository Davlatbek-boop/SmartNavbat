import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request | any = context.switchToHttp().getRequest();

    const person = req.person;

    if (!person.isCreator || person.role != "admin") {
      if (person.id != req.params.id) {
        throw new ForbiddenException({
          message: "Ruxsat etilmagan foydalanuvchi",
        });
      }
    }

    return true;
  }
}
