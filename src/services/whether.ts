import Axios, { AxiosResponse } from "axios";

interface IWhetherServiceParams {
  city: string;
  country?: string;
}

class WhetherService {
  cityname: string;
  country: string;
  apiKey: string;
  /**
   *
   * @param {IWhetherServiceParams} params
   */
  constructor(params?: IWhetherServiceParams) {
    this.apiKey = process.env.OPEN_WHETHER_API_KEY;
    if (params) {
      this.setParams(params);
    }
    return this;
  }
  /**
   *
   * @param {IWhetherServiceParams} params
   * @returns void
   */
  setParams(params: IWhetherServiceParams): void {
    this.cityname = params.city;
    if (params.country) {
      this.country = params.country;
    }
  }
  /**
   *
   * @param {string} cityname
   * @param {string} country
   * @returns Promise<AxiosResponse>
   */
  async getWhetherByCity(
    cityname?: string,
    country?: string
  ): Promise<AxiosResponse> {
    if (cityname) {
      this.cityname = cityname;
    }
    if (country) {
      this.country = country;
    }
    if (!this.cityname) {
      throw new Error(`Please provide city name.`);
    }

    return Axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${[
        this.cityname,
        this.country,
      ].join(",")}&appid=${this.apiKey}`
    );
  }
}

export default WhetherService;
