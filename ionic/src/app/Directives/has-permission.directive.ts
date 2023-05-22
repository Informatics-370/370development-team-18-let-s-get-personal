import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  @Input('appHasPermission') permissions!: string[];

  constructor(private authService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.authService.getUser().subscribe(_ => {
      console.log('Checking permissions');
      if (this.authService.hasPermission(this.permissions)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

}