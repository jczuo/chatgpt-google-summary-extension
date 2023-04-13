import { useState } from 'preact/hooks'
import { Note, Description, Button, Divider } from '@geist-ui/core'
import { XCircleFillIcon } from '@primer/octicons-react'
import Browser from 'webextension-polyfill'
import { APP_TITLE, updateUserConfig } from '@/config'

interface Props {
  isLogin: boolean
  showChatGPTTip: boolean
}

function ChatGPTTip(props: Props) {
  const { isLogin, showChatGPTTip } = props
  const [showTip, setShowTip] = useState(true)

  const onClose = () => {
    setShowTip(false)
    updateUserConfig({
      showChatGPTTip: false,
    })
  }

  const onBack = () => {
    Browser.runtime.sendMessage({
      type: 'GO_BACK',
    })
  }

  return (
    <>
      {showChatGPTTip && showTip && (
        <>
          <Note type="success" label={false}>
            <Description
              title={`${APP_TITLE}  tips:`}
              content={
                <>
                  {isLogin ? (
                    <>
                      <Divider />
                      I am Ready! <br />
                      Keep this tab to make ChatGPT more stable.
                      <Divider />
                      <Button auto type="success" onClick={onBack} scale={0.5}>
                        Back
                      </Button>
                    </>
                  ) : (
                    <>
                      <Divider />
                      Login to the ChatGPT web application to use the Glarity Summary.
                    </>
                  )}
                </>
              }
            />
          </Note>

          <Button
            className="glarity--chatgpt--tips--close"
            iconRight={<XCircleFillIcon />}
            auto
            onClick={onClose}
          />
        </>
      )}
    </>
  )
}

export default ChatGPTTip
