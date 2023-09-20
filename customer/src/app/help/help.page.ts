import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HelpPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  searchQuery: string = '';
  documentContent: string = '';
  highlightedWord:string='';

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

    /*this.http.get('help/help.page.html').subscribe((data: any) => {
      if (data && data.content) {
        this.documentContent = data.content;
      } else {
        this.documentContent = 'Document not found.';
      }
  console.log(this.documentContent)
    });*/

  }
  searchDocument() {
    
    // Clear previous highlighting
    this.highlightedWord = '';

    if (this.searchQuery) {
      const documentContentElement = document.getElementById(this.searchQuery);
      if (documentContentElement) {

        const content = documentContentElement.innerHTML;
        // Create a regular expression to search for the query case-insensitively
        const regex = new RegExp(this.searchQuery, 'gi');

         // Highlight the matches
         const highlightedContent = content.replace(
          regex,
          (match) =>
            `<span class="highlighted-text">${match}</span>`
        );

        documentContentElement.innerHTML = highlightedContent;
        // Scroll to the first highlighted match
        const firstHighlight = document.querySelector('.highlighted-text');
        if (firstHighlight) {
          firstHighlight.scrollIntoView();
          this.highlightedWord = this.searchQuery;
        }
      }
    } 
  }

  public faq() {
    this.router.navigate(["/tabs/faq"])
  }

}
