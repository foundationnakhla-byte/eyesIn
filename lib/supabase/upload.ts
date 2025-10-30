// upload.ts (client)
'use client'
import { supabaseBrowser } from '@/lib/supabase/client'

export async function uploadToProjectsBucket(file: File, folder = 'covers') {
  if (!file || file.size === 0) {
    throw new Error('الملف فارغ')
  }

  const ext = file.name.split('.').pop() || 'bin'
  const safeName = `${Date.now()}_${crypto.randomUUID()}.${ext}`.replace(/[^a-zA-Z0-9._-]/g, '')
  const path = `${folder}/${safeName}` // لا تبدأ بـ '/'

  const { data, error } = await supabaseBrowser
    .storage
    .from('projects')
    .upload(path, file, {
      upsert: true,
      cacheControl: '3600',
      contentType: file.type || 'application/octet-stream',
    })

  if (error) throw error

  // جِب رابط عام
  const { data: pub } = supabaseBrowser.storage.from('projects').getPublicUrl(path)
  return { path, publicUrl: pub.publicUrl }
}
