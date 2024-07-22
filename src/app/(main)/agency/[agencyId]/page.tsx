
import React from 'react'

const page = ({params}: {params: {agencyId: string}}) => {
  return (
    <div>
      hi 
      {params.agencyId}
    </div>
  )
}

export default page
