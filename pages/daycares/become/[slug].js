import { useRouter } from 'next/router'
import React from 'react';

const Become = () => {
  const router = useRouter()
  const { bid } = router.query

  return <p>Become: {bid}</p>
}

export default Become