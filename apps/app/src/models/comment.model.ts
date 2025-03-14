export type CommentModel = {
  id: number;
  warehouseId: number;
  userId: number;
} & ClientCommentModel;

export type ClientCommentModel = {
  senderName: string;
  content: string;
  date: string;
};

export type CreateCommentModel = {
  warehouseId: number;
  userId: number;
  content: string;
  date: string;
};
