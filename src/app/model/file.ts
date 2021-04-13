export class FileDetails {
  // tslint:disable-next-line:variable-name
  private _name: string | undefined;
  // tslint:disable-next-line:variable-name
  private _progress: number | undefined;

  constructor() {
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
}
