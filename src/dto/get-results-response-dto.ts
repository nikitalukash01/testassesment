import { ApiProperty } from '@nestjs/swagger';

class CityPopulationObject {
  name: string;
  cities_population: string;
}

class MembersObject {
  first_name: string;
  count: string;
}

class CityMembersObject {
  city: string;
  members: Array<MembersObject>;
}

export class GetResultsResponseDTO {
  @ApiProperty()
  citiesPopulation: Array<CityPopulationObject>;
  @ApiProperty()
  cityMembers: Array<CityMembersObject>;
}
