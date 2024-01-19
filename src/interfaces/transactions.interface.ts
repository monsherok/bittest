export interface ITransaction {
	id: string
	provider: string
	amount: number
	currency: string
	meta: any
	status: string
	type: string
	plan_id: any
	user_id: string
	referral_id: any
	created_at: string
	external_id: any
}
