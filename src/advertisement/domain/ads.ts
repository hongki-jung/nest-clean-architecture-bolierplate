export class Ads {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly imageUrl: string,
    readonly landingUrl: string,
    readonly targetCountry: string,
    readonly targetGender: string,
    readonly reward: number,
    readonly weight: number,
  ) {}

  getId(): Readonly<number> {
    return this.id;
  }
}
