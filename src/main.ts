import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/log/winston.logger";
import { AllExseptionsFilter } from "./common/errors/error.handling";

async function start() {
  const PORT = process.env.PORT ?? 5000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalFilters(new AllExseptionsFilter())

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigin = [
        "http://localhost:3004",
        "http://localhost:8000",
        "http://smartnavbat.uz",
        "http://smart.navbat.uz",
        "http://smart.navbat.app",
      ];
      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new BadRequestException("Not allowed by CORS"));
      }
    },
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Smart Navbat project")
    .setDescription("Smart Navbat REST API")
    .setVersion("1.0")
    .addTag("NestJS, CRUD, swagger, sendMail, tokens, Validation")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}
start();
