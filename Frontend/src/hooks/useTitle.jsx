import React from 'react'

export const useTitle = (title) => {
  return React.useEffect(() => {
    document.title = title ? `${title} - SkirmisherAI` : 'SkirmisherAI'
  }, [title])
}
