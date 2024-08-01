import { ss } from '@/utils/storage'
import { t } from '@/locales'

const LOCAL_NAME = 'chatStorage'

/**
 * 默认 Chat State
 * @returns {active}  			激活的会话 id
 * @returns {usingContext}  使用 use
 * @returns {history}				历史记录
 * @returns {chat}					chat 内容
 */
export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: t('chat.newChatTitle'), isEdit: false }],
    chat: [{ uuid, data: [] }],
  }
}

/**
 * 获取 LocalStorage
 * @returns {any}
 */
export function getLocalState(): Chat.ChatState {
  const localState = ss.get(LOCAL_NAME)
  return { ...defaultState(), ...localState }
}

/**
 * 存储 LocalStorage
 * @param {any} state:Chat.ChatState
 * @returns {any}
 */
export function setLocalState(state: Chat.ChatState) {
  ss.set(LOCAL_NAME, state)
}
