import Fastify from "fastify";
import {prisma} from "./db.js";
import bookRoutes from "../src/routes/books.js";


export function buildApp(){
    const app = Fastify({ logger: true});
    //Deixa o Prisma disponivel no Fastfy
    app.decorate('prisma', prisma);
    
    //Rotas
    app.register(bookRoutes);
    
    //Fecha o Prisma ao encerrar o app
    app.addHook('onClose', async (instance) =>{
        await instance.prisma.$disconnect();
    });
    return app;
}