import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-help',
  templateUrl: './admin-help.page.html',
  styleUrls: ['./admin-help.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class AdminHelpPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private alertController: AlertController) { }

  searchTerm: string = '';

  ngOnInit() {
    // Subscribe to route fragment changes
    this.route.fragment.subscribe((fragment: string | null) => {
      // Check if there's a fragment and scroll to it
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

  }

  findString() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const found = this.findText(this.searchTerm);
      console.log('word',found)
      if (!found) {
        //alert(`'${this.searchTerm}' not found!`);
        this.WordErrorAlert();
      }
    }
  }

  private findText(str: string): boolean {
    const textNodes = this.getTextNodes(document.body);
    let found = false;

    textNodes.forEach((node) => {
      const content = node.textContent || '';
      const index = content.indexOf(str);
      if (index !== -1) {
        const range = document.createRange();
        range.setStart(node, index);
        range.setEnd(node, index + str.length);
        const sel = window.getSelection();
        

        if(sel){
          sel.removeAllRanges();
        sel.addRange(range);
        
        // Highlight the found text with a yellow background color
        /*const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        range.surroundContents(span);*/

        // Scroll to the selected range
        node.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        found = true;
        }
      }
    });

    return found;
  }


  private getTextNodes(node: Node): Node[] {
    const textNodes: Node[] = [];
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
    } else {
      node.childNodes.forEach((child) => {
        textNodes.push(...this.getTextNodes(child));
      });
    }
    return textNodes;
  }

  public faq() {
    this.router.navigate(["/tabs/faq"])
  }

  async WordErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Sorry!',
      subHeader: 'Word Not Found',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        // handler:() =>{
        //   this.reloadPage();
        // }
      }],
    });
    await alert.present();
  }
}
