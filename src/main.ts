interface Observer {
  update: (data: any) => void;
}
interface Subject {
  subscribe: (observer: Observer) => void;
  unsubscribe: (observer: Observer) => void;
}

class BitcoinPrice implements Subject {
  observers: Observer[] = [];

  constructor() {
    const el: HTMLInputElement = document.querySelector("#fake-realtime-value");
    el.addEventListener("input", () => {
      this.notify(el.value);
    });
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer: Observer) {
    const index = this.observers.findIndex((obs) => obs === observer);
    this.observers.splice(index, 1);
  }
  notify(data: any) {
    this.observers.forEach((obs) => obs.update(data));
  }
}

class PriceDisplay implements Observer {
  private el: HTMLElement;
  constructor() {
    const el: HTMLElement = document.querySelector("#price");
    this.el = el;
  }

  update(data: any) {
    const value = Number(data);
    this.el.innerText = `$${value.toFixed(2)}`;
  }
}

const value = new BitcoinPrice();
const display = new PriceDisplay();

value.subscribe(display);

setTimeout(() => value.unsubscribe(display), 5000);
