export default class CreateTaskDto {
  title: string;
  group?: string;
  author?: string;

  constructor(title: string, group?: string, author?: string) {
    this.title = title;
    this.group = group;
    this.author = author;
  }
}
