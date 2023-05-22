import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Directive({
  selector: '[appDisableRole]'
})
export class DisableRoleDirective {

  @Input() disableForRole!: string;

  constructor(private authService: AuthenticationService,
    private renderer: Renderer2,
    public element: ElementRef) { }

  ngAfterViewInit() {
    this.authService.getUser().subscribe(user => {
      const userRole = user['roles'];

      if (userRole == this.disableForRole) {
        this.renderer.setStyle(this.element.nativeElement, 'pointer-events', 'none');
        this.renderer.setStyle(this.element.nativeElement, 'opacity', 0.4);
      }
    });
  }

}
