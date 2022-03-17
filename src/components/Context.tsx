import React, { PropsWithChildren, useContext, useState } from "react";
import { RestApiClient } from "../api/restClient";
import { config } from "../config";

const RestApiClientContext = React.createContext<RestApiClient>(new RestApiClient(config.apiUrl));

export function useRestApiClient() {
  return useContext(RestApiClientContext);
}

export function ContextProvider({ children }: PropsWithChildren<{}>) {
  const [restApiClient] = useState(new RestApiClient(config.apiUrl));

  return <RestApiClientContext.Provider value={restApiClient}>{children}</RestApiClientContext.Provider>;
}
