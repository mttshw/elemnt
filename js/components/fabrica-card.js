const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    [part="card"] {
        display: block;
        border: 1px solid var(--fabrica-card-border-color, #ddd);
        border-radius: var(--fabrica-card-border-radius, 8px);
        box-shadow: var(--fabrica-card-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.1));
        padding: var(--fabrica-card-padding, 16px);
        background-color: var(--fabrica-card-background-color, #fff);
        transition: box-shadow 0.3s;
        gap: var(--fabrica-card-gap, 12px);

        &:hover {
            box-shadow: var(--fabrica-card-box-shadow-hover, 0 4px 15px rgba(0, 0, 0, 0.2));
        }
    }

    ::slotted([slot="image"]) {
        width: 100%;
        border-top-left-radius: var(--fabrica-card-border-radius, 8px);
    }
    ::slotted([slot="title"]) {
        font-size: var(--fabrica-card-title-font-size, 1.5em);
        color: var(--fabrica-card-title-color, #111);
        font-weight: var(--fabrica-card-title-font-weight, bold);
        margin: 12px 0 8px 0;
    }
    ::slotted([slot="content"]) {
        font-size: var(--fabrica-card-content-font-size, 1em);
        color: var(--fabrica-card-content-color, #333);
    }
    ::slotted([slot="actions"]) {
        text-align: right;

        margin-right: var(--fabrica-card-gap, 0px);
    }
    [slot="actions"] {
        gap: var(--fabrica-card-gap, 12px);
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

export class FabricaCard extends HTMLElement {
    static define(tagName = "fabrica-card") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))
    }
}

FabricaCard.define()
