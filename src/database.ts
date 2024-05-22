import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                dialect: "postgres",
                host: configService.get<string>("DB_HOST"),
                port: configService.get<number>("DB_PORT"),
                username: configService.get<string>("DB_USERNAME"),
                password: configService.get<string>("DB_PASSWORD"),
                database: configService.get<string>("DB_NAME"),
                synchronize: false,
                autoLoadModels: true,
                logging: false,
                sync: { alter: false },
                define: {
                    timestamps: true,
                    underscored: true,
                    freezeTableName: false,
                },
                uuidExtension: "pgcrypto",
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [SequelizeModule],
})
export class DatabaseModule {}
