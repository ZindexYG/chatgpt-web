declare namespace Chat {
	/** @description 描述会话信息 */
	interface Chat {
		/** @description 聊天消息的时间，格式为字符串。 */
		dateTime: string
		/** @description 聊天消息的内容。 */
		text: string
		/** @description 聊天消息是否反转。 */
		inversion?: boolean
		/** @description 聊天消息是否包含错误。 */
		error?: boolean
		/** @description 聊天消息是否正在加载。 */
		loading?: boolean
		/** @description 聊天消息的对话选项，可以是 `ConversationRequest` 对象或 null。 */
		conversationOptions?: ConversationRequest | null
		/** @description 聊天消息的请求选项。 */
		requestOptions: {
			/** @description 请求提示。 */
			prompt: string;
			/** @description 请求选项，可以是 `ConversationRequest` 对象或 null。 */
			options?: ConversationRequest | null
		}
	}
	/** @description 描述历史记录的信息 */
	interface History {
		/** @description 标题 */
		title: string
		/** @description 是否可编辑 */
		isEdit: boolean
		/** @description 唯一标识符 */
		uuid: number
	}

	/** @description 聊天状态的属性 */
	interface ChatState {
		/** @description 当前活动的聊天窗口的 UUID，可能为 null。  */
		active: number | null;
		/** @description 是否使用上下文信息。  */
		usingContext: boolean;
		/** @description 聊天历史记录，包含多个 `History` 对象。  */
		history: History[];
		/** @description 聊天记录列表，包含多个 `{ uuid: number, data: Chat[] }` 对象。每个对象包含一个聊天窗口的 UUID 和该窗口的聊天记录数组。  */
		chat: { uuid: number; data: Chat[] }[]
	}

	/** @description 对话请求的属性 */
	interface ConversationRequest {
		/** @description 对话 ID */
		conversationId?: string
		/** @description 消息 ID */
		parentMessageId?: string
	}

	/** @description 对话响应的属性 */
	interface ConversationResponse {
		/** @description 对话 ID */
		conversationId: string
		/** @description 对话细节信息 */
		detail: {
			/** @description 对话选择的选项列表 */
			choices: {
				finish_reason: string;
				index: number;
				logprobs: any;
				text: string
			}[]
			/** @description 创建时间 */
			created: number
			/** @description 对话 ID */
			id: string
			/** @description 模型名称 */
			model: string
			/** @description  对象类型 */
			object: string
			/** @description 使用信息 */
			usage: {
				completion_tokens: number;
				prompt_tokens: number;
				total_tokens: number
			}
		}
		/** @description 对话 ID */
		id: string
		/** @description 父消息 ID */
		parentMessageId: string
		/** @description 角色 */
		role: string
		/** @description 响应文本 */
		text: string
	}
}
