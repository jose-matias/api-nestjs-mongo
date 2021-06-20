import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const linkMongo = 'mongodb://dbtest:dbtest@localhost:27017/api-nestjs-mongo';

@Module({
  imports: [MongooseModule.forRoot(linkMongo)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
