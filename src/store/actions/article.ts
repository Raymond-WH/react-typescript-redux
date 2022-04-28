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

// 关注用户
export const followUser = (user_id: string) => {
  return request.post(`/user/followings`, {
    target: user_id,
  })
}
// 取消关注用户
export const unFollowUser = (user_id: string) => {
  return request.delete(`/user/followings/${user_id}`)
}
// 对文章点赞
export const likeArticle = (article_id: string) => {
   return request.post(`/article/likings`, {
     target: article_id,
   })
}

// 取消对文章点赞
export const unLikeArticle = (article_id: string) => {
  return request.delete(`/article/likings/${article_id}`)
}
// 收藏文章
export const collectArticle = (article_id: string) => { 
  return request.post(`/article/collections`, {
    target: article_id,
  })
}

// 取消文章收藏
export const unCollectArticle = (article_id: string) => {
  return request.delete(`/article/collections/${article_id}`)
}

// 添加评论
export const addCommentFn = (article_id: string, content: string) => { 
  return request.post(`/comments`, {
    target: article_id,
    content,
  })
}