import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Dados } from '../../models/dados';
import data from '../../data.json';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  dados: Dados[] = data;
  dadosFiltrados: Dados[] = [];
  // Define um tipo para a variável `filtroAtivo` com três possíveis valores e inicia com 'all'
  filtroAtivo: 'all' | 'focus' | 'infocus' = 'all';

  // Armazena qual botão está ativo visualmente (útil para aplicar estilos)
  botaoAtivo: string = 'all';

  // Construtor do componente, executado ao iniciar
  constructor() {
    // Inicializa a lista filtrada com todos os dados (sem filtro)
    this.dadosFiltrados = this.dados;
  }

  // Mostra todos os itens da lista, sem filtro
  mostrarTodos() {
    this.dadosFiltrados = this.dados; // Atribui todos os dados
    this.filtroAtivo = 'all'; // Marca o filtro ativo como 'all'
    this.botaoAtivo = 'all'; // Define o botão visualmente ativo
  }

  // Mostra apenas os itens com `isActive: true`
  mostrarFocus() {
    this.dadosFiltrados = this.dados.filter((item) => item.isActive === true); // Filtra ativos
    this.filtroAtivo = 'focus'; // Marca filtro atual
    this.botaoAtivo = 'focus'; // Define botão ativo
  }

  // Mostra apenas os itens com `isActive: false`
  mostrarInfocus() {
    this.dadosFiltrados = this.dados.filter((item) => item.isActive === false); // Filtra inativos
    this.filtroAtivo = 'infocus'; // Marca filtro atual
    this.botaoAtivo = 'infocus'; // Define botão ativo
  }

  // Remove o item da lista e atualiza a exibição conforme o filtro atual
  removerItem(itemRemover: Dados) {
    // Remove o item da lista original com base no nome
    this.dados = this.dados.filter((item) => item.description !== itemRemover.description);

    // Atualiza a lista filtrada com base no filtro atual
    switch (this.filtroAtivo) {
      case 'focus':
        this.mostrarFocus();
        break;
      case 'infocus':
        this.mostrarInfocus();
        break;
      default:
        this.mostrarTodos();
    }
  }
}
