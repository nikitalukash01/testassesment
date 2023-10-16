import { Injectable, Inject } from '@nestjs/common';
import { Client } from 'pg';
import { provide } from '../dbConectorModule/dbConnnector.module';
@Injectable()
export class TestAssesmentService {
  constructor(@Inject(provide) private dbConnector: Client) {}
  async getResult(filterParam: string | undefined): Promise<any> {
    await this.dbConnector.connect();

    const citiesPopulation = (await this.dbConnector.query(
      `select  "cities"."name" ,COUNT("city_id") as "cities_population" from "residents" inner join "cities" on "cities"."id" = "residents"."city_id"  where "cities"."name" in (${
        filterParam ? `'${filterParam}'` : `"cities"."name"`
      }) group by("cities"."name") order by ("cities_population") DESC `,
    )) as unknown as Record<string, any>;

    const cityMembers = (await this.dbConnector.query(
      `select distinct "first_name","cities"."name" as "city", count("first_name") over(partition by "first_name") from residents inner join "cities" on "cities"."id" = "residents"."city_id" where "cities"."name" in (${
        filterParam ? `'${filterParam}'` : `"cities"."name"`
      })`,
    )) as unknown as Record<string, any>;

    await this.dbConnector.end();

    if (!cityMembers.rows.length && !citiesPopulation.rows.length) {
      return { cityMembers, citiesPopulation };
    }

    const cityMembersParsed = cityMembers.rows.reduce((acc, cur) => {
      const { first_name, city, count } = cur;

      const cityIndex = acc.findIndex((elem) => elem.city === city);

      if (cityIndex !== -1) {
        acc[cityIndex].members.push({ first_name, count });
        return acc;
      }

      return [...acc, { city, members: [{ first_name, count }] }];
    }, []);

    return {
      citiesPopulation: citiesPopulation.rows,
      cityMembers: cityMembersParsed,
    };
  }
}
