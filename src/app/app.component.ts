import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'custom-themes';  
  themeLoaded = false;
  
  doc: Document;

  constructor(@Inject(DOCUMENT) _doc) {
    this.doc = _doc;
  }

  ngOnInit(): void {
    this.getThemeFromCustomer()
    .pipe(delay(3000))
    .subscribe(theme => {
      let root = this.doc.documentElement;
      const secondaryColor = this.lightenDarkenColor(theme.primary, -25);
      theme.secondary = secondaryColor;
      
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--secondary', theme.secondary);

      this.themeLoaded = true;
    });
  }

  /**
   * Custom logic that uses URL and fetches the BE for the theme
   * @returns theme
   */
  private getThemeFromCustomer(): Observable<any> {
    return of({
      // azul
      primary: '#0d6efd',
      // verde
      // primary: '#157347'
    });
  }

  private lightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  }

}


