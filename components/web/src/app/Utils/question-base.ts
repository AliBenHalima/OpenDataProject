export class QuestionBase<T> {
    value: T|undefined;
    key: string;
    label: string;
    answer : string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    answerType:string;
    options: {option: string}[];

    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        answer?: string;
        answerType?:string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        options?: {option: string}[];
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.answerType = options.answerType;
      this.label = options.label || '';
      this.answer = options.answer || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
    }
  }
