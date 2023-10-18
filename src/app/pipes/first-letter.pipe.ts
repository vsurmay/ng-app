import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "firstLetter"
})

export class FirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.substring(1);
  }
}
