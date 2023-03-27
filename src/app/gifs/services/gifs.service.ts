import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _apiKey: string = 'yTLfClbtmFizkj57kFBSVY9y1msz9fCm';
  private _historial: string[] = [];
  private _servicioURL: string = 'https://api.giphy.com/v1/gifs'
  public resultados: Gif[] = [];
  

  get historial(){
    return [...this._historial]; //[] regreso un nuevo arreglo, para romper la referancia con el arreglo "_historial"
  }


  constructor(private http: HttpClient){
    //guardar en el local storage

    //historial
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!); // el "!"  le dice que a ts que no se preocupe que sabe lo que esta haciendo
    }

    //resultados
    if(localStorage.getItem('resultados')){
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  };

  buscarGifs(query: string =""){

    query = query.trim().toLocaleLowerCase(); //convierto a miniscula 

    if(query.length === 0){ //validamos que no se carguen string vacios por el input
      return;
    }

    if(!this._historial.includes(query)){ //vereficamos que no existan datos repetidos
      this._historial.unshift(query);//guardamos nuestro dato del input en el arreglo
      this._historial= this._historial.splice(0,10);//solo mantendremos en nuestro arreglo 10 datos.
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
                        .set('api_key',this._apiKey)
                        .set('limit',10)
                        .set('q',query);

    this.http.get<SearchGifsResponse>(`${this._servicioURL}/search`,{params})
         .subscribe((resp: any) =>{
          this.resultados = resp.data;
          localStorage.setItem('resultados',JSON.stringify(resp.data));
         })
    
  }
}
