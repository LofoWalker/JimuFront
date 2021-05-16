export class FileDetails {
  // tslint:disable-next-line:variable-name
  private _name: string | undefined;
  // tslint:disable-next-line:variable-name
  private _progress: number | undefined;
  // tslint:disable-next-line:variable-name
  private _size: number | undefined;
  // tslint:disable-next-line:variable-name
  private _creationDate: string | undefined;

  constructor(name: string, progress: number, size: number, creationDate: string) {
    this._name = name;
    this._size = size;
    this._progress = progress;
    this._creationDate = creationDate;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }

  get progress(): number | undefined {
    return this._progress;
  }

  set progress(value: number | undefined) {
    this._progress = value;
  }

  get size(): number | undefined {
    return this._size;
  }

  set size(value: number | undefined) {
    this._size = value;
  }

  get creationDate(): string | undefined {
    return this._creationDate;
  }

  set creationDate(value: string | undefined) {
    this._creationDate = value;
  }
}
