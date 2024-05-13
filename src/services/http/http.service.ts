import axios, {AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios';
import {API_URL, BASIC_AUTH_PASSWORD, BASIC_AUTH_USER} from '@env';

// TYPES
import {IService, EHttpMethod, EStorage} from '@/types';
import {Storage} from '../storage';

class HttpService {
  private http: AxiosInstance;
  private baseURL = API_URL;

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      // auth: {
      //   username: BASIC_AUTH_USER,
      //   password: BASIC_AUTH_PASSWORD,
      // },
      headers: this.setupHeaders(),
    });
  }

  // Get authorization token for requests
  private get getAuthorization() {
    const accessToken = Storage.getString(EStorage.TOKEN);
    return accessToken
      ? {Authorization: `Bearer ${accessToken}`}
      : {
          Authorization: `Basic ${btoa(
            BASIC_AUTH_USER + ':' + BASIC_AUTH_PASSWORD,
          )}`,
        };
  }

  // Initialize service configuration
  public service() {
    this.injectInterceptors();

    return this;
  }

  private get basicHeaders() {
    return {'X-Requested-With': 'XMLHttpRequest'};
  }

  // Set up request headers
  private setupHeaders(hasAttachment = false, via: string | null = null) {
    const headers = {
      ...this.basicHeaders,
      ...this.getAuthorization,
      ...this.setUpVia(via),
      'Content-Type': hasAttachment
        ? 'multipart/form-data'
        : 'application/json',
    };
    return headers;
  }

  private setUpVia(via: string | null) {
    if (!via) {
      return {};
    }
    return {via};
  }

  // Handle HTTP requests
  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  // Perform GET request
  public async get<T>(
    url: string,
    params?: IService.IParams,
    hasAttachment = false,
    via = null,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: this.setupHeaders(hasAttachment, via),
    });
  }

  // Perform POST request
  public async post<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  public async postWithVia<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = true,
    via = 'audio',
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment, via),
    });
  }

  // Perform UPDATE request
  public async put<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  public async patch<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PATCH, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Perform DELETE request
  public async delete<T>(
    url: string,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  public async deleteWithBody<T, P>(
    url: string,
    payload: P,
    params?: IService.IParams,
    hasAttachment = false,
  ): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  // Inject interceptors for request and response
  private injectInterceptors() {
    // Set up request interceptor
    this.http.interceptors.request.use(request => {
      // * Perform an action
      // TODO: implement an NProgress
      return request;
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      response => {
        // * Do something
        return response;
      },

      error => {
        // * Implement a global error alert
        return Promise.reject(error);
      },
    );
  }

  // Normalize errors
  private normalizeError(error: any) {
    if (error.response?.status! >= 500) {
      // Toast.show({type: 'error', text1: 'Server Error'});
    }
    return Promise.reject(error);
  }
}

export {HttpService as default};
