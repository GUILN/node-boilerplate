import { SwaggerRouter } from 'koa-swagger-decorator';

const swaggerRouter = new SwaggerRouter();

swaggerRouter.swagger({
    title: 'arch-decision-mpsbr',
    description: 'Arch Decision MPSBR',
    version: '0.0.0'
});

swaggerRouter.mapDir(__dirname);

export { swaggerRouter };