const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    :host {
        display: none;
    }

    :host([active]) {
        display: block;
    }   
    `
)

const template = document.createElement("template")
template.innerHTML = /* html */`
    <div part="content">
        <slot></slot>
    </div>
`

export class ElemntTabContent extends HTMLElement {
    static define(tagName = "elemnt-tab-content") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        
    }
}

ElemntTabContent.define();