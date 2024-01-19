export interface IApiResponse {
	data: IUser[]
}

export interface IUser {
	id: string
	email: string
	tg_id: any
	name: string
	password: any
	avatar: any
	created_at: string
	role: string
	subscription: ISubscription
}

export interface ISubscription {
	id: string
	plan_id: string
	user_id: string
	tokens: number
	additional_tokens: number
	created_at: string
	plan: Plan
}

export interface Plan {
	id: string
	type: string
	price: number
	currency: string
	tokens: number
}

export interface UsersState {
	users: IUser[]
	filteredUsers: IUser[]
	status: 'loading' | 'loaded' | 'error'
	sortOrder: 'asc' | 'desc'
	filter: string
	page: number
}
