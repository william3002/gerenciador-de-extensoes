import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DadosInterface } from '../../models/dados';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() dados: DadosInterface[] = []; // Recebe os dados do componente pai
  @Output() dadosAlterados = new EventEmitter<DadosInterface[]>(); // Emite os dados alterados para o componente pai

  dadosFiltrados: DadosInterface[] = [];
  filtroAtivo: 'all' | 'focus' | 'infocus' = 'all'; // Controla o filtro visual e lógico

  ngOnInit(): void {
    this.aplicarFiltro('all'); // Exibe todos ao iniciar
  }

  aplicarFiltro(tipo: 'all' | 'focus' | 'infocus'): void {
    this.filtroAtivo = tipo; // Atualiza o filtro ativo 

    // Aplica o filtro com base no tipo selecionado
    switch (tipo) {
      case 'focus':
        this.dadosFiltrados = this.dados.filter((item) => item.isActive); // Exibe apenas os ativos
        break;
      case 'infocus':
        this.dadosFiltrados = this.dados.filter((item) => !item.isActive); // Exibe apenas os inativos
        break;
      default:
        this.dadosFiltrados = this.dados; // Exibe todos os itens
    }
  }

  // Adiciona um novo item e atualiza o filtro e o pai
  removerItem(itemRemover: DadosInterface): void {
    const index = this.dados.findIndex(item => item.description === itemRemover.description); // Encontra o índice do item a ser removido
    // Se o item for encontrado, remove-o da lista
    if (index !== -1) {
      this.dados.splice(index, 1); // O splice remove o item do array
      this.aplicarFiltro(this.filtroAtivo); // Reaplica o filtro atual
      this.dadosAlterados.emit(this.dados); // Envia os dados atualizados ao componente pai
    }
  }

  // Altera o status (ativa/desativa) e atualiza o filtro e o pai
  alternarStatus(item: DadosInterface): void {
    item.isActive = !item.isActive; // Inverte o status do item
    this.aplicarFiltro(this.filtroAtivo); // Reaplica o filtro para manter a lista correta
    this.dadosAlterados.emit(this.dados); // Emite para atualizar os totais no AppComponent
  }
}
