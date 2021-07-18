namespace Endabgabe_SoSe21 {
    /**
     * options for cell
     */
    export interface ICellOptions {
        rowspan?: number;
        th?: boolean;
    }

    /**
     * Statische Klasse für hilfe um ui elemente zu kreieren 
     */
    export class UIHelper {

        /**
         * kreiert row span Element
         */

        
        public static createSpan(id: string, text: string): HTMLSpanElement {
            const s: HTMLSpanElement = document.createElement("span");
            //id of the element
            s.setAttribute("id", id);
            //displayed text
            s.innerHTML = text;
            //HTMLSpanElement
            return s;
        }

        /**
         * creates input element for the color input
         * id of the element
         * text: displayed text 
         * cb: callback
         */
        public static createInput(id: string, text: string, cb: (val: string) => void): HTMLInputElement {
            const s: HTMLInputElement = document.createElement("input");
            s.setAttribute("id", id);
            s.value = text;
            s.addEventListener("change", (e: Event) => cb((e.target as HTMLInputElement)?.value));
            return s;
        }

        /**
         * creates a table
         * rows: list of rows 
         * returns HTMLTableElement
         */
        public static createTable(...rows: HTMLTableRowElement[]): HTMLTableElement {
            const table: HTMLTableElement = document.createElement("table");
            table.setAttribute("id", "player-table");
            rows.forEach((r) => {
                table.appendChild(r);
            });
            return table;
        }

        /**
         * creates a row
         * {HTMLTableCellElement[]} cells list of cells
         * tr = tablerow
         * returns HTMLTableRowElement
         */
        public static createRow(...cells: HTMLTableCellElement[]): HTMLTableRowElement {
            const tr: HTMLTableRowElement = document.createElement("tr");
            cells.forEach((c) => {
                tr.appendChild(c);
            });
            return tr;
        }

        /**
         * creates a cell
         * {HTMLElement} element to put inside the cell
         * {ICellOptions} options default options 
         * returns HTMLTableCellElement
         */
        public static createCell(element: HTMLElement, options: ICellOptions = {
            rowspan: 1,
            th: false
        }): HTMLTableCellElement {
            const td: HTMLTableCellElement = document.createElement(options?.th ? "th" : "td");
            td.appendChild(element);
            if (options) {
                const r = options?.rowspan || "";
                td.setAttribute("rowspan", r?.toString());
            }
            return td;
        }
    } //Ende Klasse
} //Ende Namespace