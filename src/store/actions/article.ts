import { ApiResponse, ArticleDetail } from '@/types/data';
import request from '@/utils/request';
// 获取文章详情的接口
export const getArticleInfo = (article_id: string) => {
  return request.get<ApiResponse<ArticleDetail>>(`/articles/${article_id}`)
}