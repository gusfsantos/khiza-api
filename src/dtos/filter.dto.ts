export class FilterDto {
  equal: {
    creationAt?: Date;
  };
  between: {
    firstDate?: Date;
    lastDate?: Date;
  };
}
