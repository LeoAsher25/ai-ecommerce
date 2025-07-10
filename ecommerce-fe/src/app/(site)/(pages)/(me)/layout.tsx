import AuthGuard from '@/components/Common/AuthGuard'

import MeLayoutClient from './MeLayoutClient'

export default function MeLayout({ children }) {
  return (
    <AuthGuard>
      <MeLayoutClient>{children}</MeLayoutClient>
    </AuthGuard>
  )
}
