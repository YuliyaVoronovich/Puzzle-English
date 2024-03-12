export default class BaseComponent {
  protected node: HTMLElement;

  private children: BaseComponent[];

  constructor({ tagName = 'div', className = '', textContent = '' }, ...children: BaseComponent[]) {
    this.node = document.createElement(tagName);
    this.node.className = className;
    this.node.textContent = textContent;
    this.children = children;

    if (children) {
      this.appendChildren(children);
    }
  }

  public append(child: BaseComponent): void {
    this.children.push(child);
    this.node.append(child.getNode());
  }

  public appendHtmlElement(child: HTMLElement): void {
    this.node.append(child);
  }

  public appendChildren(children: BaseComponent[]): void {
    children.forEach((child) => {
      this.append(child);
    });
  }

  public after(child: BaseComponent): void {
    this.node.after(child.getNode());
  }

  public getNode(): HTMLElement {
    return this.node;
  }

  public getChildren(): BaseComponent[] {
    return this.children;
  }

  public setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  public setTextContent(content: string): void {
    this.node.textContent = content;
  }

  public setHTML(html: string): void {
    this.node.innerHTML = html;
  }

  public getAttribute(attribute: string): string | null {
    return this.node.getAttribute(attribute);
  }

  public removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  public addClass(className: string): void {
    this.node.classList.add(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public addListener(
    event: string,
    listener: (e: Event) => void,
    options: AddEventListenerOptions | boolean = false,
  ): void {
    this.node.addEventListener(event, listener, options);
  }

  public removeListener(
    event: string,
    listener: (e: Event) => void,
    options: AddEventListenerOptions | boolean = false,
  ): void {
    this.node.removeEventListener(event, listener, options);
  }

  public destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    this.destroyChildren();
    this.node.remove();
  }

  public replaceChild(child: BaseComponent): void {
    this.destroyChildren();
    this.node.append(child.getNode());
  }
}
