import { IsOptional, IsString } from 'class-validator';

export class CollectionDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}
