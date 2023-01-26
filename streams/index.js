import { Readable, Transform, Writable } from "node:stream";

// Readable Streams (Ler um dado aos poucos)
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) return this.push(null);

      const buffer = Buffer.from(String(i));

      this.push(buffer);
    }, 1000);
  }
}

// Transform Streams (Transformar um dado em outro)
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

// Writable Streams (Escrever um dado aos poucos)
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
