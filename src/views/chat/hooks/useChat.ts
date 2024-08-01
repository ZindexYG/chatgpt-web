import { useChatStore } from '@/store'

/**
 * @name useChatStore 的 hooks
 * @description 通过二次封装为 hooks 便于使用
 * @returns {addChat}						新增对话内容
 * @returns {updateChat}				更新对话内容
 * @returns {updateChatSome}		更新某段对话内容
 * @returns {getChatByUuidAndIndex} 			通过UUID 与INDEX 获取某段对话内容
 */
export function useChat() {
  const chatStore = useChatStore()

  /**
   * 通过UUID 与INDEX 获取某段对话内容
   * @param {number} 对话 ID
   * @param {number} 内容内容的定位
   * @returns {any}
   */
  const getChatByUuidAndIndex = (uuid: number, index: number) => {
    return chatStore.getChatByUuidAndIndex(uuid, index)
  }

  /**
   * 新增对话
   * @param {number} uuid: 对话 ID
   * @param {Chat} chat: 对话内容
   * @returns {any}
   */
  const addChat = (uuid: number, chat: Chat.Chat) => {
    chatStore.addChatByUuid(uuid, chat)
  }

  /**
   * 更新当前对话
   * @param {number} 	对话 ID
   * @param {number} 	内容内容的定位
   * @param {Chat} 		对话内容
   * @returns {any}
   */
  const updateChat = (uuid: number, index: number, chat: Chat.Chat) => {
    chatStore.updateChatByUuid(uuid, index, chat)
  }

  /**
   * 更新某一段对话
   * @param {number} 	对话 ID
   * @param {number} 	内容长度
   * @param {Chat} 		chat:Partial<Chat.Chat>
   * @returns {any}
   */
  const updateChatSome = (uuid: number, index: number, chat: Partial<Chat.Chat>) => {
    chatStore.updateChatSomeByUuid(uuid, index, chat)
  }

  return {
    addChat,
    updateChat,
    updateChatSome,
    getChatByUuidAndIndex,
  }
}
