import Grade from "../grade";

export default class GradeDTO {
    id: number;
    value: number;
    subject: string;
    weight: number;
    date: Date;

    constructor (
        id: number = 0,
        value: number = 0,
        subject: string = '',
        weight: number = 1,
        date: Date = new Date()
        ){
        this.id = id;
        this.value = value;
        this.subject = subject;
        this.weight = weight;
        this.date = date;
    }

    fromDto(): Grade {
        return new Grade(this.id, this.value, this.subject, this.weight, this.date);
    }
}
