import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CacheModule } from "@nestjs/cache-manager";
import { StudentsModule } from "./students/students.module";
import { redisStore } from "cache-manager-redis-yet";
import { ConfigModule, ConfigService } from "@nestjs/config";
import config from "./config";
import { DatabaseModule } from "./database";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        // CacheModule.register({
        //     isGlobal: true,
        //     ttl: 30 * 1000,
        //     store: redisStore,
        // }),
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (config) => {
                const store = await redisStore({
                    ttl: 30 * 1000,
                    socket: {
                        host: config.get("redis.host"),
                        port: config.get("redis.port"),
                    },
                });

                return { store, ttl: 30 * 1000 };
            },
            inject: [ConfigService],
        }),
        StudentsModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
