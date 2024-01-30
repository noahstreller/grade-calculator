export default class Subjects {
    private static subjects: Set<string> = new Set<string>();

    static add(subject: string): string {
        this.subjects.add(subject);
        return subject;
    }

    static get(): Set<string> {
        return this.subjects;
    }

    static clear(): Set<string> {
        this.subjects.clear();
        return this.subjects;
    }

    static remove(subject: string): boolean {
        this.subjects.delete(subject);
        return !this.subjects.has(subject);
    }

}