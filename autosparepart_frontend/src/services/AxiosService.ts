import { Axios } from "axios";

class AxiosService {
  private axios: Axios;
  private endpoint: string = "http://localhost:8081/api/v1";

  constructor() {
    this.axios = new Axios({
      baseURL: this.endpoint,
    });
  }

  async get<T>(
    endpointExtension: string,
    params?: { paramsName: string; paramsType: string },
    token?: string
  ) {
    const param = params && (params?.paramsName as string);
    const response = await this.axios.get<T[]>(`${endpointExtension}`, {
      headers: {
        Authorization: token && "Bearer " + token,
      },
      params: param && { [param]: params?.paramsType },
    });
    return response;
  }
}

export default AxiosService;
