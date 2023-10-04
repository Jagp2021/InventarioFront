import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UtilsService } from '../../services/utils.service';

@Pipe({
  name: 'overlayTable',
})
export class OverlayTablePipe implements PipeTransform {
  constructor(
    private _sanitizar: DomSanitizer,
    private _utilsService: UtilsService
  ) {}

  transform(
    value: string,
    nLimit: number = 25,
    sEllipsis: string = ' ...'
  ): string {
    return value.length > nLimit
      ? `${value.substring(0, nLimit)} ${sEllipsis}`
      : value;
  }
}
