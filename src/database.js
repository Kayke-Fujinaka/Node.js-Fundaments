export class Database {
  #database = {};

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      return this.#database[table].push(data);
    }

    this.#database[table] = [data];

    return data;
  }
}
