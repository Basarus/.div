import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as postmail from "./nodemailer/index";
import { createTestDatabase } from "./utls";
import * as cors from 'cors'


async function init(){
    const PORT = process.env.PORT || 9000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('.div | Тестовое задание Request')
    .setDescription('Документация REST API')
    .addTag('bazarus')
    .build()

     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('/api/docs', app, document)

     postmail.load()
     await createTestDatabase()
     
     const corsOptions = {
        origin:'http://localhost:3001', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
  
    app.use(cors(corsOptions))
    await app.listen(PORT, () => {
        console.log(`Сервер запущен, PORT: ${PORT}`)
    })
}

init()