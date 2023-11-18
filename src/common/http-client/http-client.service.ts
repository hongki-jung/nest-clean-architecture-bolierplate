import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpModuleOptions, HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { IHttpClient } from './ihttp-client';

@Injectable()
export class HttpClientService implements IHttpClient {
  constructor(private readonly http: HttpService) {}

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const request = this.http.get<T>(url, config).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error, 500);
      }),
    );
    return lastValueFrom<T>(request);
  }

  async post<T>(
    url: string,
    data: any,
    config?: HttpModuleOptions,
  ): Promise<T> {
    const request = this.http.post<T>(url, data, config).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error, 500);
      }),
    );

    return lastValueFrom<T>(request);
  }
  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const request = this.http.put<T>(url, data, config).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error, 500);
      }),
    );

    return lastValueFrom<T>(request);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const request = this.http.delete<T>(url, config).pipe(
      map((response) => response.data),
      catchError((error) => {
        throw new HttpException(error, 500);
      }),
    );

    return lastValueFrom<T>(request);
  }
}
