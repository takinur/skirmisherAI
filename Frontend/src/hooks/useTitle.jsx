import React from 'react'

export const useTitle = (title) => {
  return React.useEffect(() => {
    //Scroll to top of page on load
    window.scrollTo(0, 0)
    document.title = title ? `${title} - SkirmisherAI` : 'SkirmisherAI'
  }, [title])
}
