import 'reflect-metadata';
import { RequestHandler } from 'express';
import { CrowllerController, LoginController } from '../controller';

export function use(middleware: RequestHandler) {
    return function(target: CrowllerController | LoginController, key: string) {
        const originMiddlewares = Reflect.getMetadata('middleware', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    };
}
