import { Type } from '@angular/core';
import { DisplayerContent } from './displayer-content.interface';

/**
 * Wrap component (implemented DisplayerContent) which will be displayed by the displayer
 */
export class DisplayedWrapper {
    /**
     * 
     * @param component 
     * @param data Variable which will be used in the banner
     */
    constructor(public component: Type<DisplayerContent>, public data: any) { }
}