import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Country } from "../entities/country.entity";

@Resolver(Country)
export class CountryResolver {
  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = await Country.create({
      code,
      name,
      emoji,
      continent,
    }).save();
    return country;
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return Country.find();
  }

  @Query(() => Country, { nullable: true })
  async countryCode(@Arg("code") code: string): Promise<Country | null> {
    return Country.findOne({ where: { code } });
  }

  @Query(() => [Country])
  async countriesContinent(
    @Arg("continent") continent: string
  ): Promise<Country[]> {
    return Country.find({ where: { continent } });
  }
}
