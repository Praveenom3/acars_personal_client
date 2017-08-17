import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
import { Code } from "app/_models/code";

@Pipe({
    name: "codeFilter"
})

export class CodeFilterPipe implements PipeTransform {
     transform(value: Code[], filter: string): Code[] {
      filter = filter ? filter.toLocaleLowerCase() : '';
      return filter && value ?
        value.filter(code =>
           (code.line_14_text.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (code.line_16_text.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (code.code_combination.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (code.employers_organizations.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (code.individuals_families.toLocaleLowerCase().indexOf(filter) !== -1) 
        ) :
        value;
   }

}