const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
    :host {
        display: block;
        border: 1px solid var(--elemnt-alert-border-color, #ccc);
        border-radius: var(--elemnt-alert-border-radius, 4px);
        padding: var(--elemnt-alert-padding, 16px);
        background-color: var(--elemnt-alert-background-color, #f9f9f9);
        color: var(--elemnt-alert-text-color, #333);
        box-sizing: border-box;
        margin: 0.5rem 0;
        position: relative;
    }

    :host([variant="success"]) {
        border-color: var(--elemnt-alert-success-border-color, #4CAF50);
        background-color: var(--elemnt-alert-success-background-color, #DFF2E1);
        color: var(--elemnt-alert-success-text-color, #256029);
    }

    :host([variant="error"]) {
        border-color: var(--elemnt-alert-error-border-color, #F44336);
        background-color: var(--elemnt-alert-error-background-color, #FDECEA);
        color: var(--elemnt-alert-error-text-color, #9C1C0D);
    }

    :host([variant="warning"]) {
        border-color: var(--elemnt-alert-warning-border-color, #FF9800);
        background-color: var(--elemnt-alert-warning-background-color, #FFF4E5);
        color: var(--elemnt-alert-warning-text-color, #7F4B00);
    }

    :host([variant="info"]) {
        border-color: var(--elemnt-alert-info-border-color, #2196F3);
        background-color: var(--elemnt-alert-info-background-color, #E8F4FD);
        color: var(--elemnt-alert-info-text-color, #0D47A1);
    }

    .alert {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }

    ::slotted([slot="icon"]) {
        font-size: 1.5em;
    }

    ::slotted([slot="title"]) {
        font-weight: bold;
        font-size: 1.1em;
    }

    ::slotted([slot="content"]) {
        flex: 100%;
        margin: 0;
    }       

    ::slotted([slot="dismiss"]) {
        margin-left: auto;
        cursor: pointer;
        position: absolute;
        top: 8px;
        right: 8px;

        border: none;
        background: transparent;
        font-size: 0.8em;
        line-height: 1;
        color: var(--elemnt-alert-dismiss-color, #666);
        transition: color 0.3s;
    }

    ::slotted([slot="dismiss"]):hover {
        color: var(--elemnt-alert-dismiss-hover-color, #000);
    }

    :host([position="top-right"]),
    :host([position="top"]),
    :host([position="top-left"]),
    :host([position="bottom"]),
    :host([position="bottom-right"]),
    :host([position="bottom-left"]) {
        position: fixed;
        top: var(--elemnt-alert-fixed-top, 1rem);
        right: var(--elemnt-alert-fixed-right, 1rem);
        left: var(--elemnt-alert-fixed-left, auto);
        z-index: var(--elemnt-alert-fixed-z-index, 1000);
    }   

    :host([position="top-left"]) {
        right: auto;
        left: var(--elemnt-alert-fixed-left, 1rem);
    }

    :host([position="top"]) {
        right: auto;
        left: 50%;
        transform: translateX(-50%);
    }

    :host([position="bottom"]) {
        top: auto;
        bottom: var(--elemnt-alert-fixed-bottom, 1rem);
        right: auto;
        left: 50%;
        transform: translateX(-50%);
    }

    :host([position="bottom-right"]) {
        top: auto;
        bottom: var(--elemnt-alert-fixed-bottom, 1rem);
    }

    :host([position="bottom-left"]) {
        top: auto;
        bottom: var(--elemnt-alert-fixed-bottom, 1rem);
        right: auto;
        left: var(--elemnt-alert-fixed-left, 1rem);
    }

    :host([launch-event]) {
        display: none;
    }

    :host([visible]) {
        display: block;
    }

`)  

const template = document.createElement("template")
template.innerHTML = /* html */`
    <div class="alert">
        <slot name="icon"></slot>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <slot name="dismiss"></slot>
    </div>
`

export class ElemntAlert extends HTMLElement {
    static define(tagName = "elemnt-alert") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        if(this.querySelector('[slot="dismiss"]')) {
            const dismissBtn = this.querySelector('[slot="dismiss"]');
            dismissBtn.addEventListener('click', () => {
                this.remove();
            });
        }

        if( this.ttl && !isNaN(parseInt(this.ttl)) ) {
            setTimeout(() => {
                this.remove();
            }, parseInt(this.ttl));
        }

        if( this.launchEvent ) {
            const eventName = this.launchEvent;
            document.addEventListener(eventName, () => {
                this.setAttribute('visible', '');
            });
        }
        
    }

    get variant() {
        return this.getAttribute("variant");
    }

    get ttl() {
        return this.getAttribute("ttl");
    }

    get launchEvent() {
        return this.getAttribute("launch-event");
    }

}

ElemntAlert.define()
