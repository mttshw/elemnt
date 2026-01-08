const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    
    `)

const template = document.createElement("template")
template.innerHTML = /* html */`
    <div part="buttons">
        <slot></slot>
    </div>
`


export class ElemntButtonGroup extends HTMLElement {
    static define(tagName = "elemnt-button-group") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))
    }
}

ElemntButtonGroup.define()