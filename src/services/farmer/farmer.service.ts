import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductsFarmer } from 'src/app/interfaces/list-farmer.model';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IVendas } from 'src/app/interfaces/data-grafics.model';
import { IDataNewFarmer } from 'src/app/interfaces/new-farmer.model';

const url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class FarmerService {
  public product$: BehaviorSubject<IProductsFarmer[]> = new BehaviorSubject<
    IProductsFarmer[]
  >([]);

  constructor(private http: HttpClient) {}

  getProductsObservable(): Observable<IProductsFarmer[]> {
    return this.product$.asObservable();
  }

  // Colocar httpParams
  // public getProductsList(id: string): Observable<IProductsFarmer[]> {
  //   return this.http.get<IProductsFarmer[]>(`${url}/produtos?userId=${id}`);
  // }

  public getProductsList(id: string): Observable<IDataNewFarmer & IProductsFarmer[]> {
    let params = new HttpParams();
    params = params.set('userId', id);
    // console.log(id);
    // console.log(params);
    return this.http.get<IProductsFarmer[]>(`${url}/produtos`, { params });
  }

  public getProductsById(productId: number): Observable<IProductsFarmer[]> {
    return this.http.get<IProductsFarmer[]>(`${url}/produtos/${productId}`);
  }

  public createNewProduct(
    productFarmer: IProductsFarmer
  ): Observable<IProductsFarmer[]> {
    return this.http.post<IProductsFarmer[]>(`${url}/produtos`, productFarmer);
  }

  public updateProduct(
    productId: number,
    product: IProductsFarmer
  ): Observable<IProductsFarmer> {
    const contextUrl = `${url}/produtos/${productId}`;
    return this.http.put<IProductsFarmer>(contextUrl, product);
  }

  public deleteProduct(productId: number): Observable<IProductsFarmer> {
    return this.http.delete<IProductsFarmer>(`${url}/produtos/${productId}`);
  }

  // * Serviço para obter data dos gráficos
  public getDataGrafics(): Observable<IVendas[]> {
    return this.http.get<IVendas[]>(`${url}/dataGrafics`);
  }

  // * Cadastros

  public postNewFarmer(newFarmer: IDataNewFarmer): Observable<IDataNewFarmer> {
    return this.http.post<IDataNewFarmer>(`${url}/registerFarmer`, newFarmer);
  }
}
