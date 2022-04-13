import { RootState } from '@/types/store'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
type Props = {
  hideInput: () => void
  type: '' | 'name' | 'intro',
  onUpdate: (type:string,value: string) => void
}
const EditInput = ({ hideInput, type ,onUpdate}: Props) => {
  const { userProfile } = useSelector((state: RootState) => state.profile)
  const [value, setValue] = useState(
    type === 'name' ? userProfile.name : userProfile.intro
  )
  const inputRef = useRef<InputRef>(null)
  const textRef = useRef<TextAreaRef>(null)

  useEffect(() => { 
    if (type === 'name') {
      inputRef.current?.focus()
    } else {
      textRef.current?.focus()
    }
    document.querySelector('textarea')?.setSelectionRange(-1, -1)
  })
  return (
    <div className={styles.root}>
      <NavBar
        onBack={hideInput}
        className="navbar"
        right={<span className="commit-btn" onClick={()=>onUpdate(type,value)}>提交</span>}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>编辑{type === 'name' ? '昵称' : '简介'}</h3>

        {type === 'name' ? (
          <div className="input-wrap">
            <Input
              ref={inputRef}
              placeholder="请输入昵称"
              value={value}
              onChange={(e) => setValue(e)}
            />
          </div>
        ) : (
          <TextArea
            ref={textRef}
            value={value}
            className="textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
            onChange={(e) => setValue(e)}
          ></TextArea>
        )}
      </div>
    </div>
  )
}

export default EditInput
