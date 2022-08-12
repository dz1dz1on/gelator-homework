import path from "path";

export class TestFile {
  name: string;
  path: string;
  constructor(name: string) {
    this.name = name;
    this.path = path.resolve(`${__dirname}/${this.name}`);
  }
}

export class TestFiles {
  static jpgArtwork = new TestFile("z-test-file.jpg");
}
