import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

 
async function bootstrap() {

  /**
   * app is instance of aplication
   * app.enableCors() is used for sharing resources
   * useGlobalPipes are global validation rules for Dto
   * swagger documentation is integrated and it runs on url: http://localhost:3000/api/
   * app listen on port 3000
   */

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Swagger documentation')
    .setDescription('The library-app API description')
    .setVersion('1.0')
    .addTag('library')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
