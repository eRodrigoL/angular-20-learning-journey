import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './item-lista';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, NgClass],
  templateUrl: './lista-compras.html',
  styleUrl: './lista-compras.scss',
})
export class ListaCompras {
  item = '';
  lista: ItemLista[] = [];

  adicionaItem() {
    let itemLista = new ItemLista();
    itemLista.nome = this.item;
    itemLista.id = this.lista.length + 1;

    this.lista.push(itemLista);

    this.item = '';
  }

  riscarItem(itemLista: ItemLista) {
    itemLista.comprado = !itemLista.comprado;
  }

  limparLista() {
    this.lista = [];
  }
}
