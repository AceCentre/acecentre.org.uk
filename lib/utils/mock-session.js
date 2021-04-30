class MockSession {
  constructor(init) {
    this.store = init;
  }

  get(key) {
    return this.store[key];
  }

  set(key, value) {
    this.store[key] = value;
  }

  async save() {
    this.savedStore = this.store;
  }
}

export default MockSession;
