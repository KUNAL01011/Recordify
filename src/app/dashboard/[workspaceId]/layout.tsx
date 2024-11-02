import React from 'react'

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = ({ params , children }: Props) => {
  return (
    <div>Layout</div>
  )
}

export default Layout