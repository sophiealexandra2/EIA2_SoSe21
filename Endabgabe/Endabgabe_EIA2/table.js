"use strict";
var Endabgabe_SoSe21;
(function (Endabgabe_SoSe21) {
    /**
     * Statische Klasse für hilfe um ui elemente zu kreieren
     */
    class UIHelper {
        /**
         * kreiert row span Element
         */
        static createSpan(id, text) {
            const s = document.createElement("span");
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
        static createInput(id, text, cb) {
            const s = document.createElement("input");
            s.setAttribute("id", id);
            s.value = text;
            s.addEventListener("change", (e) => cb(e.target?.value));
            return s;
        }
        /**
         * creates a table
         * rows: list of rows
         * returns HTMLTableElement
         */
        static createTable(...rows) {
            const table = document.createElement("table");
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
        static createRow(...cells) {
            const tr = document.createElement("tr");
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
        static createCell(element, options = {
            rowspan: 1,
            th: false
        }) {
            const td = document.createElement(options?.th ? "th" : "td");
            td.appendChild(element);
            if (options) {
                const r = options?.rowspan || "";
                td.setAttribute("rowspan", r?.toString());
            }
            return td;
        }
    } //Ende Klasse
    Endabgabe_SoSe21.UIHelper = UIHelper;
})(Endabgabe_SoSe21 || (Endabgabe_SoSe21 = {})); //Ende Namespace
//# sourceMappingURL=table.js.map