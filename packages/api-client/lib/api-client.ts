export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export class ApiClient {
  private baseUrl?: string

  constructor(baseUrl = '/api') {
    this.baseUrl = `${baseUrl}`
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    }

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        const errorText = await response.text()

        return { error: errorText || response.statusText }
      }

      const data = (await response.json()) as T

      return { data }
    } catch (error) {
      return { error: (error as Error).message }
    }
  }

  public get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET')
  }

  public post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', body)
  }

  public put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', body)
  }

  public delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE')
  }

  public patch<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', body)
  }
}
