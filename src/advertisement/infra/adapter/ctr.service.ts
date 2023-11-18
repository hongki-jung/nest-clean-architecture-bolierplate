import { HttpClientService } from './../../../common/http-client/http-client.service';
import { Injectable } from '@nestjs/common';
import { ICtrService } from 'src/advertisement/application/adapter/ictr.service';

type CtrPredictionResult = {
  pctr: number[];
};
// import { CtrService as ExternalCtrService } from 'src/common/ctr.service';
@Injectable()
export class CtrService implements ICtrService {
  constructor(private httpClientService: HttpClientService) {}

  async predictCtr(userId, adCampaignIds): Promise<CtrPredictionResult> {
    const adCampaignIdsString = adCampaignIds?.join(',');
    const PREDIC_CTR_DOMAIN = 'https://predict-ctr-pmj4td4sjq-du.a.run.app';

    const result = (await this.httpClientService.get(
      `${PREDIC_CTR_DOMAIN}/?user_id=${userId}&ad_campaign_ids=${adCampaignIdsString}`,
    )) as CtrPredictionResult;

    return result;
  }
}
