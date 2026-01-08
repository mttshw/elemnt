const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    [part="card"] {
        display: block;
        border: 1px solid var(--elemnt-card-border-color, #ddd);
        border-radius: var(--elemnt-card-border-radius, 8px);
        box-shadow: var(--elemnt-card-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
        padding: var(--elemnt-card-padding, 16px);
        background-color: var(--elemnt-card-background-color, #fff);
        transition: box-shadow 0.3s;
        gap: var(--elemnt-card-gap, 12px);

        &:hover {
            box-shadow: var(--elemnt-card-box-shadow-hover, 0 4px 15px rgba(0, 0, 0, 0.2));
        }
    }

    ::slotted([slot="image"]) {
        width: 100%;
        border-top-left-radius: var(--elemnt-card-border-radius, 8px);
    }
    ::slotted([slot="title"]) {
        font-size: var(--elemnt-card-title-font-size, 1.5em);
        color: var(--elemnt-card-title-color, #111);
        font-weight: var(--elemnt-card-title-font-weight, bold);
        margin: 12px 0 8px 0;
    }
    ::slotted([slot="content"]) {
        font-size: var(--elemnt-card-content-font-size, 1em);
        color: var(--elemnt-card-content-color, #333);
    }
    ::slotted([slot="actions"]) {
        text-align: right;

        margin-right: var(--elemnt-card-gap, 0px);
    }
    [slot="actions"] {
        gap: var(--elemnt-card-gap, 12px);
    }

`)  

const template = document.createElement("template")
template.innerHTML = /* html */`
    <div part="card">
        <slot name="image"></slot>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <slot name="actions"></slot>
    </div>
`

export class elemntCard extends HTMLElement {
    static define(tagName = "elemnt-card") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))
    }
}

elemntCard.define()
