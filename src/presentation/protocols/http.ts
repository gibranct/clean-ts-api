export type HttpResponse = {
  statusCode: number
  body: any
} | undefined

export type HttpRequest = {
  body?: any
}
