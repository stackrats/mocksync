export interface IConfigEndpoint {
  url: string
  dir: string
  fileName: string
}

export interface IConfig {
  outDir: string
  endpoints: IConfigEndpoint[]
}
