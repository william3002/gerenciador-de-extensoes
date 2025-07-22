import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DadosInterface } from '../models/dados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ConsumoApiFakeService {
  private url = 'assets/data/data.json'; // Caminho para o arquivo JSON
  private http = inject(HttpClient) // Injeta o HttpClient para fazer requisições HTTP

  // Método para obter os dados do arquivo JSON
  getDados(): Observable<DadosInterface[]> {
    return this.http.get<DadosInterface[]>(this.url)
  }
}
