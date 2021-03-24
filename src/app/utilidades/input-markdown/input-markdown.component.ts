import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  contenidoMarkdown = '';

  @Input()
  placeHolderTextArea = 'Texto';

  constructor() { }

  ngOnInit() {
  }

  // inputTextArea(texto: string){
  //   this.contenidoMarkdown = texto;
  //   this.changeMarkdown.emit(texto);
  // }

}