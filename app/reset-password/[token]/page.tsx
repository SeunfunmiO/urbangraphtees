import ResetPassword from '@/app/components/ResetPassword'
import { ParamsProps } from '@/utils/type'
import React from 'react'


const Page = ({params}:ParamsProps) => {
 
  return (
    <div>
      <ResetPassword token={params.token}/>
    </div>
  )
}

export default Page