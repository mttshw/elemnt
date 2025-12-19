const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    button {
        display: inline-block;
        padding: 12px 16px;
        border: none;
        border-radius: 4px;
        background-color: var(--primary-color, blue);
        color: var(--primary-contrast-color, white);
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
    }

    button:hover {
        background-color: var(--accent-color, darkblue);
    }

    button:active {
        background-color: var(--primary-color-dark, navy);
    }

    button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    button[type="outlined"] {
        background-color: transparent;
        border: 2px solid var(--primary-color, blue);
        color: var(--primary-color, blue);
    }

    button[type="outlined"]:hover {
        border-color: var(--accent-color, navy);
        color: var(--accent-color, navy);
    }

    button[type="outlined"]:active {
        border-color: var(--accent-color, navy);
        color: var(--primary-contrast-color, white);
    }

    button[type="text"] {
        background-color: transparent;
        color: var(--primary-color, blue);
        padding: 0;
    }

    button[type="text"]:hover {
        text-decoration: underline;
        color: var(--accent-color, navy);
    }

    button[type="text"]:active {
        background-color: var(--primary-color-dark, navy);
        color: var(--primary-contrast-color, white);
    }

`)

const template = document.createElement("template")
template.innerHTML = /* html */`
    <button part="button">
        <slot name="start"></slot>
        <span part="label"><slot></slot></span>
        <slot name="end"></slot>
    </button>
`

export class FabricaButton extends HTMLElement {
    static define(tagName = "fabrica-button") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        const button = this.shadowRoot.querySelector('button')

        button.addEventListener('click', () => {
            const clickEventName = this.clickEvent
            if (clickEventName) {
                this.dispatchEvent(new CustomEvent(clickEventName, {
                    bubbles: true,
                    composed: true,
                }))
            }
        })

        button.setAttribute('type', this.type || 'filled')
        button.disabled = this.hasAttribute('disabled')
    }

    get clickEvent() {
        return this.getAttribute("click-event");
    }

    get type() {
        return this.getAttribute("type");
    }
}

FabricaButton.define()
