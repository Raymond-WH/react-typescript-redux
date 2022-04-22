import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../icon'
import styles from './index.module.scss'

/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */

type Props = {
  src: string
  className?: string
  alt?: string
}
const Img = ({ src, className, alt }: Props) => {
  // 记录图片加载是否出错的状态
  const [isError, setIsError] = useState(false)

  // 记录图片是否正在加载的状态
  const [isLoading, setIsLoading] = useState(true)

  // 对图片元素的引用
  const imgRef = useRef<HTMLImageElement>(null)
  // 图片懒加载
  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      // 如果在可视区
      const imgDom = imgRef.current!
      if (isIntersecting) {
        imgDom.src = imgDom.dataset.src!
        // 停止监听
        observer.disconnect()
      }
    })
    observer.observe(imgRef.current!)
  }, [])
  // 图片加载成功，修改loading状态
  const onLoad = () => { 
    setIsLoading(false)
  }
  // 图片加载失败，修改error状态
  const onError = () => { 
    setIsError(true)
  }
  return (
    <div className={classnames(styles.root, className)}>
      {/* 正在加载时显示的内容 */}
      {isLoading && (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )}

      {/* 加载出错时显示的内容 */}
      {isError && (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )}

      {/* 加载成功时显示的内容 */}
      {!isError && (
        <img
          alt=""
          data-src={src}
          ref={imgRef}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
      )}
    </div>
  )
}

export default Img
