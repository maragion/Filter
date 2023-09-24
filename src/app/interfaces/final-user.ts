export interface FinalUser {
  "id": number,
  "name": string,
  "email": string,
  "phone": number,
  "create_at": number | string | null,
  "update_at": number | string | null,
  "user_id": number,
  "is_admin": boolean,
  "is_ecp": boolean,
  "status": string
}
