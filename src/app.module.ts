import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from './modules/user/user.module';
import { GitModule } from './modules/git/git.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      // expandVariables: true,
      type: 'mysql',
      host: 'sh-cynosdbmysql-grp-4v6krdm8.sql.tencentcdb.com',
      port: 24120,
      username: 'root',
      password: 'Csp123456',
      database: 'csp-nest',
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      //dropSchema: true,
    }),
    ArticleModule,
    UserModule,
    GitModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
