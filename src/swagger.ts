import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default async function (app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(`Ads API `)
    .setDescription(
      `
      사용하고자 하는 api에 자물쇠가 있는 경우,
      로그인 했을떄 받은 유효한 accessToken을 기입하여 사용합니다.
    `,
    )
    .setVersion(`Ads API Version 1`)
    .addSecurityRequirements('jwt')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  // 스웨거 라우트 연동
  SwaggerModule.setup('api', app, document);
}
