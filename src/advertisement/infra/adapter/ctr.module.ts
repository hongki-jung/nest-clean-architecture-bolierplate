import { Module } from '@nestjs/common';
import { CtrService } from './ctr.service';
import { HttpClientModule } from 'src/common/http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  providers: [CtrService],
  exports: [CtrService],
})
export class CtrModule {}
