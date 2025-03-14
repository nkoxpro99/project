import { CommentSection } from '@/components/Feedback';
import { CommentModel } from '@/models/comment.model';

const mockComments: CommentModel[] = [
  {
    senderName: 'Chiến Tho',
    content: 'Chiến Tho Hữu Tình',
    timestamp: 1694260408568,
    id: 1,
    warehouseId: 1,
  },
  {
    senderName: 'Chiến Tho',
    content: 'Chiến Tho Hữu Tình',
    timestamp: 1694260408568,
    id: 4,
    warehouseId: 1,
  },
  {
    senderName: 'Chiến Tho',
    content: 'Chiến Tho Hữu Tình',
    timestamp: 1694260408568,
    id: 3,
    warehouseId: 1,
  },
  {
    senderName: 'Chiến Tho',
    content:
      'Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình Chiến Tho Hữu Tình',
    timestamp: 1694265908968,
    id: 5,
    warehouseId: 1,
  },
];

export function Comment() {
  return <CommentSection data={mockComments} />;
}
