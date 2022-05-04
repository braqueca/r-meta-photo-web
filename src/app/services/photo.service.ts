import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page.interface';
import { PhotoDto } from '../models/photo-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public findPhotos(querySearchList: Array<string>, pageNumber?: number, pageSize?: number): Promise<Page<PhotoDto>>{
    let url: string = `${environment.api.photosUrl}?`;

    let params: string = "";

    for(let querySearch of querySearchList){
      params += `${querySearch}&`;
    }

    if(pageSize && pageNumber){
      let offset = pageSize * (pageNumber - 1);

      params += `limit=${pageSize}&offset=${offset}`;
    }    

    return this.http.get<Page<PhotoDto>>(`${url}${params}`).toPromise();
  }
}
