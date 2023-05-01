export class CreateArticleDto {
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number;
  like: number;
}
