import { FilterDto } from '../dtos/filter.dto';
import { DateTime } from 'luxon';

export function filterDate(filter: string) {
  const filterDto: FilterDto = { equal: {}, between: {} };
  if (filter.includes('$eq')) {
    const date = filter.split(':');
    filterDto.equal.creationAt = DateTime.fromFormat(
      date[1],
      'yyyy-LL-dd',
    ).toJSDate();
    return filterDto;
  }
  if (filter.includes('$btw')) {
    const filterCreated = filter.split(':');
    const dates = filterCreated[1].split(',');
    filterDto.between.firstDate = DateTime.fromFormat(
      dates[0],
      'yyyy-LL-dd',
    ).toJSDate();
    filterDto.between.lastDate = DateTime.fromFormat(
      dates[1],
      'yyyy-LL-dd',
    ).toJSDate();
    return filterDto;
  }
}
