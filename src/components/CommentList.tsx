import { formatDistanceToNow } from 'date-fns';
import { MessageCircle } from 'lucide-react';

type Comment = {
  id: number;
  name: string;
  comment: string;
  created_at: string;
};

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{comment.name}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </p>
              <div className="mt-2 text-sm text-gray-700">
                <p>{comment.comment}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}