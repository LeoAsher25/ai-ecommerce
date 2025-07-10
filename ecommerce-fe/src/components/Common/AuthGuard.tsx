'use server'

import { Fragment } from 'react'

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth'
import { APP_ROUTES } from '@/constants/routes'
import { ChildrenType } from '@/types/common'

export default async function AuthGuard({ children }: ChildrenType) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(APP_ROUTES.LOGIN)
  }

  return <Fragment>{children}</Fragment>
}
// status === 'authenticated' &&
