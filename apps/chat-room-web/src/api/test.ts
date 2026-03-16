import { http } from '@/utils/request'

export async function abc() {
  return await http.get('/')
}
