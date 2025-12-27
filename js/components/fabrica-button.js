const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    [part="button"] {
        display: inline-block;
        padding: var(--fabrica-button-padding);
        border: none;
        border-radius: var(--fabrica-button-border-radius);
        background-color: var(--fabrica-button-color);
        color: var(--fabrica-button-contrast-color);
        font-size: var(--fabrica-button-font-size);
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
        border: 2px solid var(--fabrica-button-color, blue);

        &:hover,
        &:active {
            background-color: var(--fabrica-button-color-hover);
            border-color: var(--fabrica-button-color-hover);
        }

        &[disabled] {
            opacity: 0.6;
            cursor: not-allowed;

            &:hover,
            &:active {
                text-decoration: none;
                background-color: var(--fabrica-button-color);
                color: var(--fabrica-button-contrast-color);
            }
        }

        &[size="small"] {
            padding: var(--fabrica-button-padding-small);
            font-size: var(--fabrica-button-font-size-small);
        }

        &[size="large"] {
            padding: var(--fabrica-button-padding-large);
            font-size: var(--fabrica-button-font-size-large);
        }
    }

    [part="button"][type="outlined"] {
        background-color: transparent;
        border: 2px solid var(--fabrica-button-color, blue);
        color: var(--fabrica-button-color, blue);

        &[disabled]:hover,
        &[disabled]:active {
            border-color: var(--fabrica-button-color, blue);
            color: var(--fabrica-button-color, blue);
            background-color: transparent;
        }
    }

    [part="button"][type="outlined"]:hover,
    [part="button"][type="outlined"]:active,
    [part="button"][type="outlined"]:focus {
        border-color: var(--fabrica-button-color-hover);
        color: var(--fabrica-button-color-hover);
    }


    [part="button"][type="text"] {
        background-color: transparent;
        color: var(--fabrica-button-color);
        padding: 0;
        border: transparent;

        &[disabled]:hover,
        &[disabled]:active {
            color: var(--fabrica-button-color);
            background-color: transparent;
            text-decoration: none;

            [part="label"] {
                color: var(--fabrica-button-color);
                background-color: transparent;
                text-decoration: none;
            }
        }   
    }

    [part="button"][type="text"]:hover,
    [part="button"][type="text"]:focus {
        [part="label"] {
            text-decoration: underline;
            color: var(--fabrica-button-color-hover);
        }
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
        // find the default inner element (template renders a <button> by default)
        let inner = this.shadowRoot.querySelector('[part="button"]')


        this.checkAs(inner);

        
        // forward a custom click event name from the host if provided
        inner.addEventListener('click', (ev) => {
            if (this.hasAttribute('disabled')) {
                // prevent action when disabled (anchors need manual prevention)
                ev.preventDefault()
                ev.stopImmediatePropagation()
                return
            }

            const clickEventName = this.clickEvent
            if (clickEventName) {
                console.log(`FabricaButton: dispatching custom click event '${clickEventName}'`)
                this.dispatchEvent(new CustomEvent(clickEventName, {
                    bubbles: true,
                    composed: true,
                }))
            }
        })
    }

    checkAs(inner) {
        const isLink = (this.as || '').toLowerCase() === 'link'

        if (isLink) {
            // create an anchor to replace the default button
            const a = document.createElement('a')
            a.setAttribute('part', 'button')
            // copy label/slots
            a.innerHTML = inner.innerHTML
            // copy link attributes
            a.setAttribute('href', this.href || '#')
            if (this.hasAttribute('target')) a.setAttribute('target', this.getAttribute('target'))
            if (this.hasAttribute('rel')) a.setAttribute('rel', this.getAttribute('rel'))
            // reflect the visual "type" for styling (e.g. [type="text"]) 
            a.setAttribute('type', this.type || 'link')
            
            // if disabled, reflect via aria-disabled
            if (this.hasAttribute('disabled')) a.setAttribute('aria-disabled', 'true')

            inner.replaceWith(a)
            inner = a
        } else {
            // keep the button and apply button-specific props
            inner.setAttribute('type', this.type || '')
            inner.disabled = this.hasAttribute('disabled')
        }

        if (this.hasAttribute('size')) {
            inner.setAttribute('size', this.size)
        }

    }

    get clickEvent() {
        return this.getAttribute("click-event");
    }

    get href() {
        return this.getAttribute("href");
    }

    get as() {
        return this.getAttribute("as");
    }

    get type() {
        return this.getAttribute("type");
    }

    get size() {
        return this.getAttribute("size");
    }
}

FabricaButton.define()
