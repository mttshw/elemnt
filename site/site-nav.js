const styles = new CSSStyleSheet();
styles.replaceSync(/* css */`
    ul {
        list-style: none;
        margin: 0;
        padding: 16px;
        display: flex;
        gap: 8px;
        flex-direction: column;

        a {
            text-decoration: none;
            color: var(--primary-color, blue);

            &:hover {
                text-decoration: underline;
            }
        }
    }
`);

const pages = [
    { name: "Alert", href: "/components/alert.html" },
    { name: "Button", href: "/components/button.html" },
    { name: "Card", href: "/components/card.html" },
    { name: "Menu", href: "/components/menu.html" },
    { name: "Typography", href: "/components/typography.html" },
];

const template = document.createElement("template");
template.innerHTML = /* html */`
    <nav>
        <ul>
            ${pages.map(page => { 
                if(location.origin.includes("github")) { 
                     page.href = "/elemnt" + page.href
                }
                if(page.href === location.pathname) {
                    return `<li><strong>${page.name}</strong></li>`
                }
                return `<li><a href="${page.href}">${page.name}</a></li>` }).join("")
            }
        </ul>
    </nav>
`;
export class SiteNav extends HTMLElement {
    static define(tagName = "site-nav") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))
    }
}

SiteNav.define()