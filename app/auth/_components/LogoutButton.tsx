'use client'

import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth.actions"

const LogoutButton = () => {
  return (
     <Button onClick={async () => await logout()}>Logout</Button>
  )
}
export default LogoutButton