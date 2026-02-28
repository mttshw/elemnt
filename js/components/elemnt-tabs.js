const styles = new CSSStyleSheet()
styles.replaceSync(/* css */`
       
    
    `)

const template = document.createElement("template")
template.innerHTML = /* html */`
    <div>
        <slot></slot>
    </div>
`

export class ElemntTabs extends HTMLElement {
    static define(tagName = "elemnt-tabs") {
        customElements.define(tagName, this)
    }
    shadowRoot = this.attachShadow({ mode: "open" });

    connectedCallback() {
        this.shadowRoot.adoptedStyleSheets = [styles]
        this.shadowRoot.replaceChildren(template.content.cloneNode(true))

        const tabContents = this.querySelectorAll("elemnt-tab-content")
        const tabs = this.querySelectorAll("elemnt-tab")

        this.selectFirstTab()

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.removeAttribute("active"))
                tab.setAttribute("active", "")

                tabContents.forEach(tc => tc.removeAttribute("active"))
                tabContents[index].setAttribute("active", "")
            })
        })
    }

    selectFirstTab() {
        const firstTab = this.querySelector("elemnt-tab")
        console.log(firstTab)
        if (firstTab) {
            firstTab.setAttribute("active", "")
            const firstContent = this.querySelector("elemnt-tab-content[name='" + firstTab.getAttribute("name") + "']")
            console.log(firstContent)
            if (firstContent) {
                firstContent.setAttribute("active", "")
            }
        }
    }
}

ElemntTabs.define();