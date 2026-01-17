const styles = new CSSStyleSheet()
styles.replaceSync(/*css*/`
    :host {
        position: relative;
    }
    [part="button"] {
        display: inline-block;
        padding: var(--elemnt-button-padding);
        border: none;
        border-radius: var(--elemnt-button-border-radius);
        background-color: var(--elemnt-button-color);
        color: var(--elemnt-button-contrast-color);
        font-size: var(--elemnt-button-font-size);
        cursor: pointer;
        transition: all 0.3s;
        text-decoration: none;
        border: var(--elemnt-button-border-width) solid var(--elemnt-button-color, blue);

        &:hover,
        &:active {
            background-color: var(--elemnt-button-color-hover);
            border-color: var(--elemnt-button-color-hover);
        }

        &[disabled] {
            opacity: 0.6;
            cursor: not-allowed;

            &:hover,
            &:active {
                text-decoration: none;
                background-color: var(--elemnt-button-color);
                color: var(--elemnt-button-contrast-color);
            }
        }

        &[size="small"] {
            padding: var(--elemnt-button-padding-small);
            font-size: var(--elemnt-button-font-size-small);
        }

        &[size="large"] {
            padding: var(--elemnt-button-padding-large);
            font-size: var(--elemnt-button-font-size-large);
        }
    }

    [part="button"][type="outlined"] {
        background-color: transparent;
        border: var(--elemnt-button-border-width) solid var(--elemnt-button-color, blue);
        color: var(--elemnt-button-color, blue);

        &[disabled]:hover,
        &[disabled]:active {
            border-color: var(--elemnt-button-color, blue);
            color: var(--elemnt-button-color, blue);
            background-color: transparent;
        }
    }

    [part="button"][type="outlined"]:hover,
    [part="button"][type="outlined"]:active,
    [part="button"][type="outlined"]:focus {
        border-color: var(--elemnt-button-color-hover);
        color: var(--elemnt-button-color-hover);
    }


    [part="button"][type="text"] {
        background-color: transparent;
        color: var(--elemnt-button-color);
        padding: 0;
        border: transparent;

        &[disabled]:hover,
        &[disabled]:active {
            color: var(--elemnt-button-color);
            background-color: transparent;
            text-decoration: none;

            [part="label"] {
                color: var(--elemnt-button-color);
                background-color: transparent;
                text-decoration: none;
            }
        }   

        &:hover,
        &:focus {
            color: var(--elemnt-button-color-hover);

            [part="label"] {
                text-decoration: underline;
            }
        }
    }

    [part="button"][color="accent"] {
        background-color: var(--elemnt-button-color-accent);
        color: var(--elemnt-button-contrast-color-accent);
        border-color: var(--elemnt-button-color-accent);

        &:hover,
        &:focus {
            background-color: var(--elemnt-button-color-hover-accent);
            border-color: var(--elemnt-button-color-hover-accent);
        }

        &[type="outlined"] {
            background-color: transparent;
            color: var(--elemnt-button-color-accent);
            border-color: var(--elemnt-button-color-accent);

            &:hover,
            &:focus {
                border-color: var(--elemnt-button-color-hover-accent);
                color: var(--elemnt-button-color-hover-accent);
            }
        }

        &[type="text"] {
            background-color: transparent;
            color: var(--elemnt-button-color-accent);

            &:hover,
            &:focus {
                color: var(--elemnt-button-color-hover-accent);
            }
        }
    }

    [part="button"][color="error"] {
        background-color: var(--error-color);
        color: var(--error-color-contrast);
        border-color: var(--error-color);

        &:hover,
        &:focus {
            background-color: var(--error-color-dark);
            border-color: var(--error-color-dark);
        }

        &[type="outlined"] {
            background-color: transparent;
            color: var(--error-color);
            border-color: var(--error-color);

            &:hover,
            &:focus {
                border-color: var(--error-color-dark);
                color: var(--error-color-dark);
            }
        }

        &[type="text"] {
            background-color: transparent;
            color: var(--error-color);

            &:hover,
            &:focus {
                color: var(--error-color-dark);
            }
        }
    }

    [part="button"][color="success"] {
        background-color: var(--success-color);
        color: var(--success-color-contrast);
        border-color: var(--success-color);

        &:hover,
        &:focus {
            background-color: var(--success-color-dark);
            border-color: var(--success-color-dark);
        }

        &[type="outlined"] {
            background-color: transparent;
            color: var(--success-color);
            border-color: var(--success-color);

            &:hover,
            &:focus {
                border-color: var(--success-color-dark);
                color: var(--success-color-dark);
            }
        }

        &[type="text"] {
            background-color: transparent;
            color: var(--success-color);

            &:hover,
            &:focus {
                color: var(--success-color-dark);
            }
        }
    }

    [part="button"][color="neutral"] {
        background-color: var(--neutral-color);
        color: var(--neutral-color-contrast);
        border-color: var(--neutral-color);

        &:hover,
        &:focus {
            background-color: var(--neutral-color-light);
            border-color: var(--neutral-color-light);
        }

        &[type="outlined"] {
            background-color: transparent;
            color: var(--neutral-color-contrast);
            border-color: var(--neutral-color-dark);

            &:hover,
            &:focus {
                border-color: var(--neutral-color-dark);
                color: var(--neutral-color-dark);
            }
        }

        &[type="text"] {
            background-color: transparent;
            color: var(--neutral-color-contrast);

            &:hover,
            &:focus {
                color: var(--neutral-color-dark);
            }
        }
    }

    :host([menu-item]) [part="button"] {
        padding: var(--elemnt-menu-item-padding);
        border-radius: var(--elemnt-menu-item-border-radius);
        background-color: var(--elemnt-menu-background-color);
        border: transparent;
        color: var(--elemnt-menu-item-color, var(--primary-color, blue));
        display: flex;
        gap: 8px;
        width: 100%;
        box-sizing: border-box;

        &:hover,
        &:focus {
            background-color: var(--elemnt-menu-hover-background-color);
        }
    }

    :host([in-group]) [part="button"] {
        border-radius: 0;
    }
    :host([in-group]):not(:host([first-in-group])) [part="button"] {
        margin-left: calc(-1 * var(--elemnt-button-border-width));
    }
    :host([first-in-group]) [part="button"] {
        border-top-left-radius: var(--elemnt-button-border-radius);
        border-bottom-left-radius: var(--elemnt-button-border-radius);
    }
    :host([last-in-group]) [part="button"] {
        border-top-right-radius: var(--elemnt-button-border-radius);
        border-bottom-right-radius: var(--elemnt-button-border-radius);
    }

    slot[name="start"]::slotted(*),
    slot[name="end"]::slotted(*) {
        display: inline-block;
        height: var(--elemnt-button-font-size);
        width: var(--elemnt-button-font-size);
    }

    slot[name="submenu"] {
        display: none;
        position: absolute;
        left: 100%;
        top: 0;
    }
    slot[name="submenu"][open] {
        display: block;
    }
`)

const template = document.createElement("template")
template.innerHTML = /*html*/`
    <button part="button">
        <slot name="start"></slot>
        <span part="label"><slot></slot></span>
        <slot name="end"></slot>
    </button>
    <slot name="submenu"></slot>
`

export class elemntButton extends HTMLElement {
    static define(tagName = "elemnt-button") {
        customElements.define(tagName, this)
    }

    static get observedAttributes() {
        return ["type", "size", "color"]; 
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
                console.log(`elemntButton: dispatching custom click event '${clickEventName}'`)
                this.dispatchEvent(new CustomEvent(clickEventName, {
                    bubbles: true,
                    composed: true,
                }))
            }
        })

        // submenu slot presence handling: reflect whether the slot has content with a host attribute
        const submenuSlot = this.shadowRoot.querySelector('slot[name="submenu"]');
        if (submenuSlot) {
            inner.addEventListener('click', (ev) => {
                const isOpen = submenuSlot.hasAttribute('open');
                if (isOpen) {
                    submenuSlot.removeAttribute('open');
                    this.removeAttribute('submenu-open');
                } else {
                    submenuSlot.setAttribute('open', '');
                    this.setAttribute('submenu-open', '');
                }
            });
            // const updateSubmenuState = () => {
            //     const nodes = submenuSlot.assignedNodes({ flatten: true }) || [];
            //     const hasContent = nodes.some(n => {
            //         if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim() !== '';
            //         return true;
            //     });
            //     if (hasContent) {
            //         this.setAttribute('has-submenu', '');
            //     } else {
            //         this.removeAttribute('has-submenu');
            //     }
            // };
            // // initial check
            // updateSubmenuState();
            // // react to changes
            // submenuSlot.addEventListener('slotchange', updateSubmenuState);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const inner = this.shadowRoot.querySelector('[part="button"]');
            if (!inner) return;
            if (name === "type") {
                inner.setAttribute("type", newValue || "");
            } else if (name === "size") {
                if (newValue) {
                    inner.setAttribute("size", newValue);
                } else {
                    inner.removeAttribute("size");
                }
            } else if (name === "color") {
                if (newValue) {
                    inner.setAttribute("color", newValue);
                } else {
                    inner.removeAttribute("color");
                }
            }
        }
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

        if (this.hasAttribute('color')) {
            inner.setAttribute('color', this.color)
        }

        

        if( this.hasAttribute('submenu-open')) {
            const submenuSlot = this.shadowRoot.querySelector('slot[name="submenu"]');
            if(submenuSlot) {
                submenuSlot.setAttribute('open', '');
            }
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

    get color() {
        return this.getAttribute("color");
    }
}

elemntButton.define()
