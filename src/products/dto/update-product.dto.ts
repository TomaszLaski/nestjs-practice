import { Tags } from 'src/enums/tags.enum';

export interface UpdateProductDto {
  name: string;
  price: number;
  count: number;
  tags: Array<Tags>;
}