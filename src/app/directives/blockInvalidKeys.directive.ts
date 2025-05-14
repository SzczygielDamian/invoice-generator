import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[appBlockInvalidKeys]'
})
export class BlockInvalidKeysDirective {
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        const invalidKeys = ['e', 'E', '+', "-"]
        if (invalidKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
}