const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    :host {
        display: inline-block;
        padding: var(--elemnt-tab-padding, 0.5em 1em);
        border: none;
        border-bottom: 2px solid transparent;
        background-color: transparent;
        color: var(--elemnt-tab-color, black);
        font-size: var(--elemnt-tab-font-size, 1em);
        cursor: pointer;
        transition: all 0.3s;
    }

    :host([active]) {
        border-bottom-color: var(--elemnt-tab-active-border-color, blue);
        color: var(--elemnt-tab-active-color, blue);
    }
    
    button {
        all: unset;
        cursor: inherit;
        display: block;
        width: 100%;
        height: 100%;
    }
`)

const template = document.createElement("template")
template.innerHTML = /* html */`
    <button part="tab" type="text">
        <slot></slot>
    </button>
`

export class ElemntTab extends HTMLElement {
    static define(tagName = "elemnt-tab") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        
    }
}

ElemntTab.define();