const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    nav {
        display: flex;
        flex-direction: column;
        gap: var(--elemnt-menu-gap, 8px);
        padding: var(--elemnt-menu-padding, 16px);
        border: 1px solid var(--elemnt-menu-border-color, #ddd);
        border-radius: var(--elemnt-menu-border-radius, 4px);
        background-color: var(--elemnt-menu-background-color, #fafafa);
    }

    :host([orientation="horizontal"]) {
        nav {
            flex-direction: row;
        }


    }
     

    :host([alignment="right"]) {
        nav {
            justify-content: flex-end;
        }
    }
    :host([alignment="right"][orientation="vertical"]) {
        nav {
            align-items: flex-end;
        }
    }
    :host([alignment="center"]) {
        nav {
            justify-content: center;
        }
    }
    :host([alignment="center"][orientation="vertical"]) {
        nav {
            align-items: center;
        }
    }

    :host([width="content"]) {
        max-width: fit-content;
        display: inline-block;
    }

    ::slotted(a),
    ::slotted(button) {
        text-decoration: none;
        color: var(--primary-color, blue);
        font-weight: 500;
        padding: var(--elemnt-menu-item-padding, 8px);
        border-radius: var(--elemnt-menu-item-border-radius, 4px);
        transition: background-color 0.3s;
        display: inline-block;
        border: 0;
        background: none;
        font: inherit;
        cursor: pointer;
        text-align: left;
    }
    ::slotted(a:hover),
    ::slotted(button:hover),
    ::slotted(a:focus),
    ::slotted(button:focus) {
        background-color: var(--elemnt-menu-hover-background-color, #eee);
    }

    ::slotted(a[disabled]),
    ::slotted(button[disabled]) {
        opacity: 0.6;
        cursor: not-allowed;
    }
    ::slotted(a[disabled]:hover),
    ::slotted(button[disabled]:hover),
    ::slotted(a[disabled]:focus),
    ::slotted(button[disabled]:focus) {
        background-color: transparent;
        text-decoration: none;
    }

`)  

const template = document.createElement("template")
template.innerHTML = /* html */`
    <nav>
        <slot></slot>
    </nav>
`

export class ElemntMenu extends HTMLElement {
    static define(tagName = "elemnt-menu") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        if(this.padding) {
            this.shadowRoot.querySelector("nav").style.padding = this.padding;
        }

        if(this.gap) {
            this.shadowRoot.querySelector("nav").style.gap = this.gap;
        }

        if(this.itemPadding) {
            this.shadowRoot.querySelector("slot").style.setProperty("--elemnt-menu-item-padding", this.itemPadding);
        }

        if(this.itemBorderRadius) {
            this.shadowRoot.querySelector("slot").style.setProperty("--elemnt-menu-item-border-radius", this.itemBorderRadius);
        }
    }

    get orientation() {
        return this.getAttribute("orientation");
    }

    get width() {
        return this.getAttribute("width");
    }

    get align() {
        return this.getAttribute("align");
    }
    
    // overrides
    get padding() {
        return this.getAttribute("padding");
    }

    get gap() {
        return this.getAttribute("gap");
    }

    get itemPadding() {
        return this.getAttribute("itemPadding");
    }

    get itemBorderRadius() {
        return this.getAttribute("itemBorderRadius");
    }
}

ElemntMenu.define()
