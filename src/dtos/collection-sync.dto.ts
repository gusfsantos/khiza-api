export class CollectionSyncDto {
  collections: CollectionsDto[];
}

export class CollectionsDto {
  id: string;
  slug: string;
  createdAt: Date;
  name: string;
  image: string;
  banner: string;
  discordUrl: string;
  externalUrl: string;
  twitterUsername: string;
  openseaVerificationStatus: string;
  description: string;
  sampleImages: string[];
  tokenCount: string;
  onSaleCount: string;
  primaryContract: string;
  tokenSetId: string;
  creator: string;
  royalties: Royalties;
  allRoyalties: AllRoyalties;
  floorAsk: FloorAsk;
  topBid: TopBid;
  rank: Rank;
  volume: Volume;
  volumeChange: VolumeChange;
  floorSale: FloorSale;
  floorSaleChange: FloorSaleChange;
  collectionBidSupported: boolean;
  ownerCount: number;
  contractKind: string;
  mintedTimestamp: any;
  mintStages: any[];
}

export interface Royalties {
  recipient: string;
  breakdown: Breakdown[];
  bps: number;
}

export interface Breakdown {
  bps: number;
  recipient: string;
}

export interface AllRoyalties {
  eip2981: Eip2981[];
  onchain: Onchain[];
  opensea: Opensea[];
}

export interface Eip2981 {
  bps: number;
  recipient: string;
}

export interface Onchain {
  bps: number;
  recipient: string;
}

export interface Opensea {
  bps: number;
  recipient: string;
}

export interface FloorAsk {
  id: string;
  sourceDomain: string;
  price: Price;
  maker: string;
  validFrom: number;
  validUntil: number;
  token: Token;
}

export interface Price {
  currency: Currency;
  amount: Amount;
}

export interface Currency {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Amount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface Token {
  contract: string;
  tokenId: string;
  name: string;
  image: string;
}

export interface TopBid {
  id: string;
  sourceDomain: string;
  price: Price2;
  maker: string;
  validFrom: number;
  validUntil: number;
}

export interface Price2 {
  currency: Currency2;
  amount: Amount2;
  netAmount: NetAmount;
}

export interface Currency2 {
  contract: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Amount2 {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface NetAmount {
  raw: string;
  decimal: number;
  usd: number;
  native: number;
}

export interface Rank {
  '1day': number;
  '7day': number;
  '30day': number;
  allTime: number;
}

export interface Volume {
  '1day': number;
  '7day': number;
  '30day': number;
  allTime: number;
}

export interface VolumeChange {
  '1day': number;
  '7day': number;
  '30day': number;
}

export interface FloorSale {
  '1day': number;
  '7day': number;
  '30day': number;
}

export interface FloorSaleChange {
  '1day': number;
  '7day': number;
  '30day': number;
}
