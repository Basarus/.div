import { NestFactory } from "@nestjs/core";
import { RequestModule } from "./request.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as postmail from "./nodemailer/index";
import { createTestDatabase } from "./utls";

async function init(){
    const PORT = process.env.PORT || 9000;
    const app = await NestFactory.create(RequestModule);

    const config = new DocumentBuilder()
    .setTitle('.div | Тестовое задание Request')
    .setDescription('Документация REST API')
    .addTag('bazarus')
    .build()

     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('/api/docs', app, document)

     postmail.load()
     await createTestDatabase()
    await app.listen(PORT, () => {
        console.log(`Сервер запущен, PORT: ${PORT}`)
    })
}

init()