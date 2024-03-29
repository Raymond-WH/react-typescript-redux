import { InfiniteScroll, NavBar, Popup } from 'antd-mobile'
import CommentFooter from '../CommentFooter'
import NoComment from '../NoComment'
import styles from './index.module.scss'
import { Comment, CommentRes } from '@/types/data'
import CommentItem from '../CommentItem'
import { useState } from 'react'
import { addReplyFn, getReplyComments } from '@/store/actions/article'
import CommentInput from '../CommentInput'
import { useParams } from 'react-router-dom'
type Props = {
  hideReply?: () => void
  comment?: Comment
  addReplyCount?: (comment_id: string) => void
}
export default function CommentReply({
  hideReply,
  comment = {} as Comment,
  addReplyCount
}: Props) {
  // 显示原始评论
  console.log(comment)

  // 显示评论回复
  // 获取评论的所有回复
  const [replyList, setReplyList] = useState<CommentRes>({
    results: [],
    total_count: 100,
    last_id: '',
    end_id: '',
  })

  const hasMore = replyList.total_count > replyList.results.length
  const loadMore = async () => {
    const res = await getReplyComments(comment.com_id, replyList.last_id)
    setReplyList({
      ...res.data.data,
      results: [...replyList.results, ...res.data.data.results],
      total_count: res.data.data.total_count,
    })
    // console.log('ddddd');
  }
  const [visible, seIsVisible] = useState(false)
  const show = () => {
    seIsVisible(true)
  }
  const hide = () => {
    seIsVisible(false)
  }

  // 拿到路径里的id值
  const { id } = useParams<{id:string}>()
  const addReply = async(value:string) => { 
    const res = await addReplyFn(comment.com_id, value, id)
    console.log(res);
    
    // 保存到回复列表
    setReplyList({
      ...replyList,
      results: [res.data.data.new_obj,...replyList.results],
      total_count:replyList.total_count + 1
    })
    // 关闭弹层
    hide()
    // 让评论的数量加1
    addReplyCount?.(comment.com_id)
  }
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        {/* 顶部导航栏 */}
        <NavBar onBack={hideReply} className="transparent-navbar">
          <div>{comment.reply_count}条回复</div>
        </NavBar>

        {/* 原评论信息 */}
        <div className="origin-comment">
          <CommentItem type="origin" comment={comment}></CommentItem>
        </div>

        {/* 回复评论的列表 */}
        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {replyList.results.map((item) => {
            return (
              <CommentItem
                type="reply"
                key={item.com_id}
                comment={item}
              ></CommentItem>
            )
          })}
          {replyList.results.length === 0 && <NoComment />}
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={loadMore}
          ></InfiniteScroll>
        </div>

        {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
        <CommentFooter type="reply" showComment={show} />

        {/* 添加回复功能 */}
        <Popup position="bottom" visible={visible} destroyOnClose>
          <CommentInput
            name={comment.aut_name}
            hideComment={hide}
            addComment={ addReply}
          ></CommentInput>
        </Popup>
      </div>
    </div>
  )
}
