import { ApiResponse, ArticleDetail, CommentRes } from '@/types/data';
import request from '@/utils/request';
// 获取文章详情的接口
export const getArticleInfo = (article_id: string) => {
  return request.get<ApiResponse<ArticleDetail>>(`/articles/${article_id}`)
}

// 获取文章评论
export const getArticleComments = (article_id: string,offset?:string) => {
  return request.get<ApiResponse<CommentRes>>(`/comments`, {
    params: {
      type: 'a',
      source: article_id,
      offset
    }
  })
}