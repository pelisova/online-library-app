import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

 
async function bootstrap() {

  //app instance
  const app = await NestFactory.create(AppModule);
  app.enableCors() //for communication with frontend app
  
  //global validation rules for dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
  }));

  //swagger docs integration
  //url: http://localhost:3000/api/
  const config = new DocumentBuilder()
    .setTitle('Swagger documentation')
    .setDescription('The library-app API description')
    .setVersion('1.0')
    .addTag('library')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  //app listen on port 3000
  await app.listen(3000);
}
bootstrap();
