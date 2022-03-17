import { Hotel, Traslation } from "./model";

export type UrlCreator = ReturnType<typeof createUrlCreator>;

function createUrlCreator(apiUrl: string) {
  return {
    hotels: () => `${apiUrl}/hotels`,
    traslations: () => `${apiUrl}/traslations`,
  };
}

function checkStatus(response: Response): Promise<Response> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return response.text().then((text) => {
    throw new Error(`${response.status}: ${text}`);
  });
}

function get(uri: string) {
  return fetch(uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => checkStatus(response));
}

export class RestApiClient {
  public readonly urlCreator: ReturnType<typeof createUrlCreator>;

  constructor(apiUrl: string) {
    this.urlCreator = createUrlCreator(apiUrl);
  }

  public getHotels() {
    return get(this.urlCreator.hotels())
      .then((response) => checkStatus(response))
      .then<Hotel>((response) => response.json());
  }

  public getTraslations() {
    return get(this.urlCreator.traslations())
      .then((response) => checkStatus(response))
      .then<Traslation>((response) => response.json());
  }
}
