
import { Navigate, Outlet } from "react-router-dom"

export function ProtectAuth() {
  const stored = localStorage.getItem('token')
  const parsed = stored ? stored : null
  return !parsed ? <Outlet /> : <Navigate to="/" replace={true} />
}