import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./components/card/card.component";
import { HeaderComponent } from "./components/header/header.component";
import { DadosInterface } from './models/dados';
import { ConsumoApiFakeService } from './services/consumo-api-fake.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  extension: DadosInterface[] = []; // Lista de dados principal com a api
  private service = inject(ConsumoApiFakeService)
  
  ngOnInit(): void {
    this.carregarDados(); // Chamada inicial dos dados
  }

  private carregarDados(){
    this.service.getDados().subscribe((dados: DadosInterface[]) => { 
      this.extension = dados; // Atribui os dados à variável principal
    });
  }

  // Atualiza os dados recebidos do CardComponent
  atualizarLista(novosDados: DadosInterface[]) {
    this.extension = [...novosDados]; // Clona e atualiza os dados
  }

  // Getters que se atualizam automaticamente sempre que `extension` mudar
  get totalExtensoes(): number {
    return this.extension.length;
  }

  // Contadores para extensões ativas e inativas
  get totalAtivas(): number {
    return this.extension.filter((ativo) => ativo.isActive).length;
  }

  get totalInativas(): number {
    return this.extension.filter((inativo) => !inativo.isActive).length;
  }
}
