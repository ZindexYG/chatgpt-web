import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'

/**
 * Chat Api
 * @param {any} prompt:string
 * @param {any} options?
 * 		@param {any} options?conversationId
 * 		@param {any} options?parentMessageId
 * @param {any} signal?:GenericAbortSignal
 * @returns {any}
 */
export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

/**
 * 获取 Chat 配置
 * @returns {any}
 */
export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

/**
 * 会话主要接口
 * @param {params}
 * 		@param {params.prompt}												// 文本具体内容
 * 		@param {params？.options}
 * 				@param {params.options？.conversationId}						// 接口所需的 会话 ID
 * 				@param {params.options？.parentMessageId}						// 接口所需的 上一段文本 ID
 * 		@param {params？.signal} 							axios 可供手动暂停的属性
 * 		@param {params？.onDownloadProgress} 	callback 回调函数
 *
 * @returns {any}
 */
export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore() // 获取缓存中的配置
  const authStore = useAuthStore() 			 // 获取服务端返回的配置

  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
  }

  // 判断是否有使用模型的 ChatGPT
  // 默认是使用的...
  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  return post<T>({
    url: '/chat-process',
    data,
    signal: params.signal, // 以 fetch API  AbortController 方式取消请求/中断请求
    onDownloadProgress: params.onDownloadProgress, // 允许处理下载的进度事件
  })
}

/**
 * 获取历史会话
 * @returns {any}
 */
export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

/**
 * 验证 token 是否还在有效期内
 * @param {string} token:string
 * @returns {any}
 */
export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}
