const styles = new CSSStyleSheet()
styles.replaceSync(/*css*/`
    [part="divider"] {
        border: none;
        border-top: var(--elemnt-divider-height, 1px) solid var(--elemnt-divider-color, gray);
        margin: var(--elemnt-divider-margin, 0.3em 0);
    }
`)

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <div part="divider"></div>
`  

export class ElemntDivider extends HTMLElement {
    static define(tagName = "elemnt-divider") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        if(this.height) {
            this.shadowRoot.querySelector('[part="divider"]').style.borderTopWidth = this.height;
        }

        if(this.width) {
            if(this.width === "full") {
                this.shadowRoot.querySelector('[part="divider"]').style.width = "100%";
            } else {
                this.shadowRoot.querySelector('[part="divider"]').style.width = this.width;
            }
        }
    }

    get height() {
        return this.getAttribute("height");
    }

    get width() {
        return this.getAttribute("width");
    }
}

ElemntDivider.define();