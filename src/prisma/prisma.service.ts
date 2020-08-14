import { Injectable } from '@nestjs/common';
import { use, settings } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';

use(
  prisma({ client: { options: { log: ['query'] } }, features: { crud: true } }),
);

settings.change({
  server: {
    startMessage: info => {
      settings.original.server.startMessage(info);
    },
  },
  schema: {
    generateGraphQLSDLFile: './src/generated/nexus.graphql',
  },
});

@Injectable()
export class PrismaService {}
