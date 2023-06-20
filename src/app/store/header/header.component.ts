import { Component } from '@angular/core';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public toggleMenu() {
        let menuItems = document.getElementById('MenuItems')!;

        if (menuItems.style.maxHeight == '0px' || menuItems.style.maxHeight == '') {
            menuItems.style.maxHeight = '200px'
        }
        else {
            menuItems.style.maxHeight = '0px'
        }
    }
}
